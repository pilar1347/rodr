import { useState, useEffect } from 'react'
import { DataContext } from './DataContext'
import { fetchChallengesData, fetchTeamsData } from '../services/googleSheets'

// DataProvider component
export const DataProvider = ({ children }) => {
  const [challengesData, setChallengesData] = useState([])
  const [teamsData, setTeamsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load both challenges and teams data
        const [challenges, teams] = await Promise.all([
          fetchChallengesData(),
          fetchTeamsData()
        ])
        
        setChallengesData(challenges)
        setTeamsData(teams)
      } catch (err) {
        setError('Failed to load data')
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const value = {
    challengesData,
    teamsData,
    loading,
    error,
    // Expose refresh function for manual data refresh
    refreshData: async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [challenges, teams] = await Promise.all([
          fetchChallengesData(),
          fetchTeamsData()
        ])
        
        setChallengesData(challenges)
        setTeamsData(teams)
      } catch (err) {
        setError('Failed to refresh data')
        console.error('Error refreshing data:', err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}