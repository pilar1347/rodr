import styles from './TeamItem.module.css'

const TeamItem = ({ team, rank }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return styles.first
    if (rank === 2) return styles.second
    if (rank === 3) return styles.third
    return ''
  }

  // Generate Google Sheets URL for the team's sheet
  const getTeamSheetUrl = (teamName) => {
    const SHEET_ID = '1tE08TsZa66RmZgkuQV77FTVNRTwXY56BJ7MEscW5AZw'
    // Encode the team name for URL
    const encodedTeamName = encodeURIComponent(teamName)
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0&range=${encodedTeamName}!A1`
  }

  const handleTeamClick = () => {
    if (team.teamName) {
      const url = getTeamSheetUrl(team.teamName)
      window.open(url, '_blank', 'noopener,noreferrer')
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
        
        <div className={styles.points}>
          <span className={styles.pointsValue}>{team.totalPoints || 0}</span>
          <span className={styles.pointsLabel}>pts</span>
        </div>
      </div>

    </div>
  )
}

export default TeamItem