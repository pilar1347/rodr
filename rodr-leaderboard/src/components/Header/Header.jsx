import styles from './Header.module.css'
import logo from './logo.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <img
              src={logo}
              alt="R.O.D.R. Logo"
              className={styles.logo}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>R.O.D.R.</h1>
            </div>
          </div>
        </div>
        <div className={styles.challengeInfo}>
          <h2 className={styles.challengeTitle}>Summer of Love 2025</h2>
          <p className={styles.challengeDates}>July 18 - September 18, 2025</p>
        </div>
      </div>
    </header>
  )
}

export default Header