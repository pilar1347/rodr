import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.title}>R.O.D.R.</h1>
          <p className={styles.subtitle}>Royal Order of the Desert Rats</p>
        </div>
        <div className={styles.challengeInfo}>
          <h2 className={styles.challengeTitle}>Summer of Love 2025</h2>
          <p className={styles.challengeDates}>July 18 - September 18, 2025</p>
          <p className={styles.challengeDescription}>
            Arizona's premier running challenge in the desert heat
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header