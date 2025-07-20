import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <NavLink 
          to="/teams" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          🏆 Team Leaderboard
        </NavLink>
        <NavLink 
          to="/challenges" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          🎯 Challenges
        </NavLink>
      </div>
    </nav>
  )
}

export default Navigation