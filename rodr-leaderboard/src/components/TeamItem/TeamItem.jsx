import styles from './TeamItem.module.css'

const TeamItem = ({ team, rank }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return styles.first
    if (rank === 2) return styles.second
    if (rank === 3) return styles.third
    return ''
  }

  const handleTeamClick = () => {
    if (team.teamName) {
      window.open(team.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className={`${styles.item} ${getRankClass(rank)} ${styles.clickable}`}
      onClick={handleTeamClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleTeamClick()
        }
      }}
    >
      <div className={styles.rank}>
        <span className={styles.rankNumber}>{rank}</span>
        {rank <= 3 && <span className={styles.medal}>🏆</span>}
      </div>
      
      <div className={styles.teamInfo}>
        <div className={styles.teamName}>
          <span className={styles.name}>{team.teamName || 'Unknown Team'}</span>
        </div>
        
        <div className={styles.members}>
          <span className={styles.membersList}>
            {team.members ? team.members.join(' - ') : 'No members listed'}
          </span>
        </div>
      </div>
        
      <div className={styles.points}>
        <span className={styles.pointsValue}>{team.totalPoints || 0}</span>
        <span className={styles.pointsLabel}>pts</span>
      </div>

    </div>
  )
}

export default TeamItem