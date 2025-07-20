import { useState } from 'react'
import TeamItem from '../TeamItem/TeamItem'
import { useData } from '../../hooks/useData'
import styles from './TeamsView.module.css'

const TeamsView = () => {
  const { teamsData } = useData()
  const [sortBy, setSortBy] = useState('points')

  // Sort teams data
  const sortedData = [...teamsData].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return (b.totalPoints || 0) - (a.totalPoints || 0)
      case 'name':
        return (a.teamName || '').localeCompare(b.teamName || '')
      default:
        return 0
    }
  })

  return (
    <div className={styles.teamsView}>
      <div className={styles.header}>
        <h2 className={styles.title}>🏆 Team Leaderboard</h2>
        <p className={styles.description}>
          See which teams are leading the Summer of Love challenge!
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.sortGroup}>
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="points">Total Points (High to Low)</option>
            <option value="name">Team Name</option>
          </select>
        </div>
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.rank}>Rank</div>
        <div className={styles.teamName}>Team Name</div>
        <div className={styles.members}>Members</div>
        <div className={styles.points}>Total Points</div>
      </div>

      <div className={styles.list}>
        {sortedData.length === 0 ? (
          <div className={styles.noData}>No team data available.</div>
        ) : (
          sortedData.map((team, index) => (
            <TeamItem 
              key={team.teamName}
              team={team}
              rank={index + 1}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <p>Total Teams: {sortedData.length}</p>
        <p>Last Updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}

export default TeamsView