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
      
      <div className={styles.teamName}>
        <span className={styles.name}>{item.teamName || 'Unknown Team'}</span>
      </div>
      
      <div className={styles.category}>
        <span className={styles.categoryBadge}>{item.category || 'General'}</span>
      </div>
      
      <div className={styles.points}>
        <span className={styles.pointsValue}>{formatPoints(item.points)}</span>
        <span className={styles.pointsLabel}>pts</span>
      </div>
      
      <div className={styles.description}>
        <p className={styles.descriptionText}>{item.description || 'No description available'}</p>
      </div>
      
      <div className={styles.link}>
        {item.stravaLink && item.stravaLink !== '-' ? (
          <button 
            onClick={() => handleStravaClick(item.stravaLink)}
            className={styles.stravaButton}
            title="View on Strava"
          >
            <span className={styles.stravaIcon}>🏃</span>
            Strava
          </button>
        ) : (
          <span className={styles.noLink}>-</span>
        )}
      </div>

      {/* Mobile layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileRank}>
            #{rank} {rank <= 3 && '🏆'}
          </div>
          <div className={styles.mobilePoints}>
            {formatPoints(item.points)} pts
          </div>
        </div>
        
        <div className={styles.mobileTeam}>
          {item.teamName || 'Unknown Team'}
        </div>
        
        <div className={styles.mobileCategory}>
          <span className={styles.categoryBadge}>{item.category || 'General'}</span>
        </div>
        
        <div className={styles.mobileDescription}>
          {item.description || 'No description available'}
        </div>
        
        {item.stravaLink && item.stravaLink !== '-' && (
          <div className={styles.mobileStrava}>
            <button 
              onClick={() => handleStravaClick(item.stravaLink)}
              className={styles.stravaButton}
            >
              <span className={styles.stravaIcon}>🏃</span>
              View on Strava
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardItem