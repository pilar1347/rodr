import styles from './LeaderboardItem.module.css'

const LeaderboardItem = ({ item, rank }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return styles.first
    if (rank === 2) return styles.second
    if (rank === 3) return styles.third
    return ''
  }

  const formatPoints = (points) => {
    return points || 0
  }

  const handleStravaClick = (url) => {
    if (url && url !== '-') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={`${styles.item} ${getRankClass(rank)}`}>
      <div className={styles.rank}>
        <span className={styles.rankNumber}>{rank}</span>
        {rank <= 3 && <span className={styles.medal}>🏆</span>}
      </div>
      
      <div className={styles.challengeInfo}>
        <div className={styles.teamName}>
          <span className={styles.name}>{item.teamName || 'Unknown Team'}</span>
        </div>
        
        <div className={styles.categoryRow}>
          <span className={styles.categoryBadge}>{item.category || 'General'}</span>
          {item.link && item.link !== '-' && (
            <button
              onClick={() => handleStravaClick(item.link)}
              className={styles.stravaButton}
              title="More info"
            >
              <span className={styles.stravaIcon}>🔗</span>
              More Info
            </button>
          )}
        </div>
        
        <div className={styles.description}>
          <p className={styles.descriptionText}>{item.description || 'No description available'}</p>
        </div>
      </div>
        
      <div className={styles.points}>
        <span className={styles.pointsValue}>{formatPoints(item.points)}</span>
        <span className={styles.pointsLabel}>pts</span>
      </div>
    </div>
  )
}

export default LeaderboardItem