# RODR Summer of Love 2025 Leaderboard

A React web application displaying the leaderboard for the Royal Order of the Desert Rats (RODR) Summer of Love challenge - Arizona's premier running challenge in the desert heat.

## Features

- 🏃‍♂️ Real-time leaderboard data from Google Sheets
- 🏆 Ranking system with special styling for top 3 positions
- 📱 Fully responsive design for mobile and desktop
- 🎨 Desert-themed Arizona color palette
- 🔄 Auto-refresh every 5 minutes
- 📊 Filter by challenge categories
- 🔗 Direct links to Strava segments
- 🌵 CSS Modules for component-scoped styling

## Challenge Information

- **Event**: Summer of Love 2025
- **Duration**: July 18 - September 18, 2025
- **Organization**: Royal Order of the Desert Rats (RODR)
- **Location**: Arizona Desert

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rodr-leaderboard
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up Google Sheets API:
```bash
cp .env.example .env
# Edit .env and add your Google Sheets API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Configuration

### Google Sheets Integration

The app can fetch data in two ways:

1. **CSV Export** (Default - No API key required)
   - Uses Google Sheets' public CSV export feature
   - More reliable but less flexible

2. **Google Sheets API** (Optional - Requires API key)
   - Get an API key from [Google Cloud Console](https://console.developers.google.com/)
   - Enable the Google Sheets API
   - Add the key to your `.env` file as `VITE_GOOGLE_SHEETS_API_KEY`

### Data Structure

The app expects the Google Sheet to have the following columns:
- Column A: Challenge/Team Name
- Column B: Description
- Column C: Points
- Column D: (Unused)
- Column E: Notes/Rules
- Column F: Strava Link

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling
- **Axios** - HTTP client for API requests
- **Google Sheets API** - Data source

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Leaderboard/
│   │   ├── Leaderboard.jsx
│   │   └── Leaderboard.module.css
│   └── LeaderboardItem/
│       ├── LeaderboardItem.jsx
│       └── LeaderboardItem.module.css
├── services/
│   └── googleSheets.js
├── App.jsx
├── App.module.css
├── index.css
└── main.jsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please contact the RODR organization or create an issue in this repository.

---

🌵 **Keep running in the desert heat!** 🌵
