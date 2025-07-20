import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import ChallengesView from './components/ChallengesView/ChallengesView'
import TeamsView from './components/TeamsView/TeamsView'
import { DataProvider } from './contexts/DataProvider'
import { useData } from './hooks/useData'
import styles from './App.module.css'

// Main App content component that uses the data context
const AppContent = () => {
  const { loading, error } = useData()

  if (loading) {
    return (
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading leaderboard data...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.error}>{error}</div>
        </main>
      </div>
    )
  }

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Navigation />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/teams" replace />} />
            <Route path="/teams" element={<TeamsView />} />
            <Route path="/challenges" element={<ChallengesView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Main App component that wraps everything with the DataProvider
function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

export default App
