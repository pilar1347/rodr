import { useState } from 'react'
import LeaderboardItem from '../LeaderboardItem/LeaderboardItem'
import { useData } from '../../hooks/useData'
import styles from './ChallengesView.module.css'

const ChallengesView = () => {
  const { challengesData } = useData()
  const [sortBy, setSortBy] = useState('points')
  const [filterCategory, setFilterCategory] = useState('all')

  // Get unique categories from data
  const categories = ['all', ...new Set(challengesData.map(item => item.category))]

  // Filter and sort data
  const filteredData = challengesData.filter(item =>
    filterCategory === 'all' || item.category === filterCategory
  )

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return (b.points || 0) - (a.points || 0)
      case 'name':
        return (a.teamName || '').localeCompare(b.teamName || '')
      case 'category':
        return (a.category || '').localeCompare(b.category || '')
      default:
        return 0
    }
  })

  return (
    <div className={styles.challengesView}>
      <div className={styles.header}>
        <h2 className={styles.title}>🎯 Available Challenges</h2>
        <p className={styles.description}>
          Complete these challenges to earn points for your team!
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <label htmlFor="category-filter">Filter by Category:</label>
          <select 
            id="category-filter"
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.select}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sortGroup}>
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="points">Points (High to Low)</option>
            <option value="name">Challenge Name</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.rank}>Rank</div>
        <div className={styles.challengeName}>Challenge</div>
        <div className={styles.category}>Category</div>
        <div className={styles.points}>Points</div>
        <div className={styles.description}>Description</div>
        <div className={styles.link}>Strava Link</div>
      </div>

      <div className={styles.list}>
        {sortedData.length === 0 ? (
          <div className={styles.noData}>No challenges found for the selected category.</div>
        ) : (
          sortedData.map((item, index) => (
            <LeaderboardItem 
              key={`${item.teamName}-${item.category}-${index}`}
              item={item}
              rank={index + 1}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <p>Total Challenges: {sortedData.length}</p>
        <p>Last Updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ChallengesView