# Danone Scout

A mobile-first React application for Danone employees to scout and track Danone products by taking pictures of menus in restaurants, bars, and bakeries. The app features gamification elements with a points system and leaderboard to encourage user participation and competitive scouting.

## Features

### 🗺️ Interactive Map
- Real Paris business locations with interactive markers
- Green markers: Confirmed Danone customers
- Orange markers: Unknown status businesses (higher points opportunity)
- Click markers to see business details and potential points

### 📸 Camera Integration
- Take photos of menus directly from the app
- Upload existing photos from gallery
- Select business location for context
- Real-time points calculation based on business status and data age

### 🏆 Gamification System
- **Points System:**
  - New business discovery: 100 points
  - Old data update (30+ days): 75 points
  - Recent data update: 25 points
  - Very old data bonus (90+ days): +50 points

### 📊 Leaderboard
- Real-time rankings with colleague competition
- Department-based leaderboards
- Recent activity feed
- Personal statistics tracking

### 📋 Game Rules
- Complete rule explanations
- Points system breakdown
- Pro tips for maximizing points
- Support contact information

## Technology Stack

- **Frontend:** React 18 with Vite
- **Styling:** Styled Components
- **Maps:** React Leaflet with OpenStreetMap
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Deployment:** Docker with Nginx

## Danone Branding

The app uses official Danone brand colors:
- **Primary:** #005EB8 (Danone Blue), #00ACED (Light Blue), #002677 (Dark Blue), #FFFFFF (White)
- **Secondary:** #EF3340 (Red), #F88806 (Orange), #54AD18 (Green), #F3D03E (Yellow)

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your machine

### Deployment

1. **Clone and navigate to the project:**
   ```bash
   cd /path/to/POS_front_end_demo
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access the application:**
   Open your browser and navigate to: `http://localhost:3000`

4. **View logs (optional):**
   ```bash
   docker logs danone-menu-tracker
   ```

5. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Alternative Docker Commands

Using npm scripts:
```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Stop and remove the container
npm run docker:stop

# View container logs
npm run docker:logs
```

## Development

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the app:**
   Open `http://localhost:3000` in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Application Structure

```
src/
├── components/          # React components
│   ├── MapView.jsx     # Interactive map with Paris businesses
│   ├── Camera.jsx      # Photo capture and upload
│   ├── Leaderboard.jsx # Rankings and activity feed
│   ├── Rules.jsx       # Game rules and instructions
│   └── Navigation.jsx  # Bottom navigation bar
├── data/
│   └── mockData.js     # Fake data for businesses, users, points
└── App.jsx             # Main application component
```

## Mock Data

The application includes realistic mock data:
- **12 Paris businesses** with real addresses and coordinates
- **6 mock users** with points, departments, and rankings
- **Points system** with different scenarios
- **Recent activities** showing user interactions

## Mobile-First Design

- Responsive design optimized for mobile devices
- Touch-friendly interface elements
- Maximum width container (430px) for mobile simulation
- Bottom navigation for easy thumb access
- Optimized map interactions for touch devices

## Future Enhancements

- Real backend integration with Databricks
- Actual camera API integration
- Push notifications for competitions
- Offline mode for photo capture
- Advanced analytics dashboard
- Multi-language support

## Support

For technical support or questions about the application, contact the development team or use the in-app support feature.

---

**Developed for Danone** - Enhancing business intelligence through gamified scouting and data collection.
