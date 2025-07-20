import axios from 'axios'

// Google Sheets configuration
const SHEET_ID = '1tE08TsZa66RmZgkuQV77FTVNRTwXY56BJ7MEscW5AZw'
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY

/**
 * Fetch challenges data (master list)
 */
export const fetchChallengesData = async () => {
  try {
    // Use CSV export for the master sheet (gid=0)
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
    
    const response = await axios.get(CSV_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'text/csv'
      }
    })
    
    const data = parseCSVData(response.data)
    const challenges = data.filter(item => item.points);

    return challenges;
    
  } catch (error) {
    console.error('Error fetching challenges data:', error)
    return [];
  }
}

/**
 * Fetch teams data by getting each team's sheet
 */
export const fetchTeamsData = async () => {
  try {
    // First, try to get sheet metadata to discover team tabs
    const sheetsMetadata = await getSheetMetadata();
    
    if (sheetsMetadata && sheetsMetadata.length > 0) {
      const teamsData = [];;
      
      // Fetch data for each discovered team sheet
      for (const sheetInfo of sheetsMetadata) {
        try {
          const teamData = await fetchSingleTeamData(sheetInfo)
          if (teamData) {
            teamsData.push(teamData)
          }
        } catch (teamError) {
          console.warn(`Failed to fetch data for team ${sheetInfo.name}:`, teamError)
        }
      }
      
      // Sort teams by total points (descending)
      teamsData.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
      
      return teamsData
    }
    
  } catch (error) {
    console.error('Error fetching teams data:', error)
    return []
  }
}

/**
 * Get sheet metadata to discover team tabs
 */
const getSheetMetadata = async () => {
  try {
    if (!API_KEY) {
      console.log('No API key available for metadata fetch')
      return null
    }
    
    const METADATA_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${API_KEY}`
    
    const response = await axios.get(METADATA_URL, {
      timeout: 10000
    })
    
    const sheets = response.data.sheets || []
    
    // Filter for team sheets (exclude MASTER, FAQ, SCORE BOARD)
    const teamSheets = sheets.filter(sheet => {
      const title = sheet.properties.title
      return title &&
             !title.toLowerCase().includes('master') &&
             !title.toLowerCase().includes('faq') &&
             !title.toLowerCase().includes('score board') &&
             title.trim() !== ''
    })
    
    return teamSheets.map(sheet => ({
      name: sheet.properties.title,
      gid: sheet.properties.sheetId.toString()
    }))
    
  } catch (error) {
    console.warn('Could not fetch sheet metadata:', error)
    return null
  }
}

/**
 * Fetch data for a single team from their sheet tab
 */
const fetchSingleTeamData = async (teamConfig) => {
  try {
    // Use CSV export for the specific team sheet
    // const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${teamConfig.gid}`;

    const team = encodeURIComponent(teamConfig.name);
    const scoreRange = `${team}!D83`;
    const membersRange = `${team}!K3:K6`;
    const mainChallenges = `${team}!D7:D39`;
    const xtraChallenges = `${team}!D46:D81`;

    const CSV_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?` +
      `ranges=${scoreRange}&` +
      `ranges=${membersRange}&` +
      `ranges=${mainChallenges}&` +
      `ranges=${xtraChallenges}&` +
      `majorDimension=COLUMNS&` +
      `key=${API_KEY}`;

    const response = await axios.get(CSV_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'text/csv'
      }
    })

    const sheetData = response.data.valueRanges;
    const teamScore = sheetData?.[0]?.values?.[0] ?? 0;
    const teamMembers = sheetData?.[1].values?.[0] ?? [];
    const challenges1 = sheetData?.[2].values?.[0]?.[0] ?? [];
    const challenges2 = sheetData?.[3].values?.[0]?.[0] ?? [];
    const challenges = [...challenges1, ...challenges2];
    const completedChallenges = challenges.filter(x => x.length > 0).length;

    return {
      teamName: teamConfig.name,
      members: teamMembers.filter(x => !x.startsWith('Team member')),
      totalPoints: Number(teamScore),
      completedChallenges
    };
        
  } catch (error) {
    console.error(`Error fetching team data for ${teamConfig.name}:`, error)
    return null
  }
}

/**
 * Parse CSV data into structured format for challenges
 */
const parseCSVData = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim())
  const data = []
  
  // Skip header rows and find the data starting point
  let dataStartIndex = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    if (line.includes('thing') || line.includes('challenge') || line.includes('180 degrees')) {
      dataStartIndex = i
      break
    }
  }
  
  if (dataStartIndex === -1) {
    console.warn('Could not find data start point in CSV')
    return []
  }
  
  // Process data rows
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    
    // Parse CSV line (handle quoted fields)
    const fields = parseCSVLine(line)
    
    if (fields.length >= 6) {
      const [challenge, description, points, , notes, link] = fields
      
      // Skip empty or header rows
      if (!challenge || challenge.toLowerCase().includes('thing') || 
          challenge.toLowerCase().includes('team name') ||
          challenge.toLowerCase().includes('do not use')) {
        continue
      }
      
      // Extract category from challenge name
      let category = 'General'
      if (challenge.includes('180 DEGREES')) category = '180 Degrees'
      else if (challenge.includes('LADY LL')) category = 'Lady LL'
      else if (challenge.includes('DUDE LL')) category = 'Dude LL'
      else if (challenge.includes('WEST')) category = 'West'
      else if (challenge.includes('EAST')) category = 'East'
      else if (challenge.includes('PMP')) category = 'PMP'
      else if (challenge.includes('MOST LEGENDARY')) category = 'Most Legendary'
      
      const item = {
        teamName: challenge.trim(),
        description: description?.trim() || '',
        points: parseInt(points) || 0,
        category: category,
        notes: notes?.trim() || '',
        stravaLink: link?.trim() || '-'
      }
      
      if (item.teamName && item.teamName !== '-') {
        data.push(item)
      }
    }
  }
  
  return data
}

/**
 * Parse a single CSV line handling quoted fields
 */
const parseCSVLine = (line) => {
  const fields = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  fields.push(current.trim())
  return fields
}

// Legacy export for backward compatibility
export const fetchLeaderboardData = fetchChallengesData