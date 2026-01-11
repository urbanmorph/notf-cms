# Corporations of Greater Bengaluru

An intelligent civic issue management platform for Bengaluru's 5 city corporations.

## Overview

This modern web platform provides AI-powered issue tracking and resolution across Greater Bengaluru's 5 city corporations:
- Bengaluru North City Corporation
- Bengaluru South City Corporation
- Bengaluru East City Corporation
- Bengaluru West City Corporation
- Rajarajeshwari Nagar City Corporation

## Features

- 🤖 **AI-Powered Issue Routing** - Automatic assignment of issues to engineers based on geography and responsibility
- 📊 **Real-Time Dashboards** - Commissioner dashboards with performance metrics and KPIs
- 📱 **Multi-Channel Support** - WhatsApp, Telegram, Email integration
- 🗺️ **Interactive Maps** - Geographic tracking of issues across the city
- ⚡ **Priority Matrix** - Smart escalation system for critical issues
- 📈 **Performance Analytics** - Track resolution time, SLA compliance, and citizen satisfaction

## Project Structure

```
notf-cms/
├── index.html              # Landing page with corporation rankings
├── north.html              # Bengaluru North Corporation page
├── south.html              # Bengaluru South Corporation page
├── east.html               # Bengaluru East Corporation page
├── west.html               # Bengaluru West Corporation page
├── rajarajeshwari.html     # RR Nagar Corporation page
├── styles.css              # Global styles
├── main.js                 # Main JavaScript functionality
├── data.js                 # Mock data for all corporations
└── files/
    ├── gba_corporation.geojson  # Corporation boundary data
    └── BLR City Officials Database.xlsx  # Official contact information
```

## Deployment to GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your repository settings: https://github.com/[your-username]/notf-cms/settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/" (root) folder
5. Click "Save"

### Step 2: Access Your Site

Your site will be available at: `https://[your-username].github.io/notf-cms/`

The deployment typically takes 1-2 minutes.

## Local Development

To test locally, simply open `index.html` in a web browser. For a better development experience with live reload:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then visit: http://localhost:8000

## Data Sources

- Mock issue data based on BBMP grievances analysis from [OpenCity](https://opencity.in/decoding-bengalurus-civic-complaints-a-deep-dive-into-bbmp-grievances-data-2025/)
- Corporation boundary data from cityofficials.bengawalk.com
- Official contact database in `files/BLR City Officials Database.xlsx`

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Data**: Client-side JSON data storage

## Performance Metrics

The platform tracks key performance indicators (KPIs) for each corporation:
- Resolution Rate
- Average Response Time
- SLA Compliance %
- Citizen Satisfaction Score
- Overall Performance Score (weighted calculation)

## Future Enhancements

- Backend integration for real-time data
- User authentication for commissioner dashboards
- AI/ML matching for issue assignment
- Integration with existing BBMP systems
- Mobile app version
- Real-time notifications

## License

See LICENSE file for details.

## Contact

For questions or suggestions, please open an issue in this repository.
