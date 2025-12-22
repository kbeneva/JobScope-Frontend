# JobScope

JobScope is a comprehensive job search platform focused on computer science and IT-related job opportunities. It helps users discover relevant positions while providing real-time labor market insights through interactive analytics. The app combines intuitive job searching with data-driven market analysis to empower tech job seekers with the information they need.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Emulator (or iOS Simulator for Mac users)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/kbeneva/JobScope-Frontend.git
   cd JobScope-Frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the Application**
```bash
   npx expo start
```

4. **Run on your device**
   - Scan the QR code with the Expo Go app (iOS/Android)
   - Press `a` for Android Emulator
   - Press `i` for iOS Simulator (Mac only)

### Running with Tunnel (External Network)

If you need to access the app from a device on a different network:

1. **Install ngrok**
```bash
   npm install -g @ngrok/ngrok
```

2. **Start with tunnel**
```bash
   npx expo start --tunnel
```

### Running the Tests

All tests are automated using **Jest** and are located in the `__tests__` folder or alongside service files in `src/services`. The tests only cover service logic, API interactions, and error handling. 

#### Run all tests with coverage
```bash
npm run test:coverage
```

## Backend API

This mobile application is powered by the JobScope RESTful API, which provides:
- Computer science job listings
- User authentication and profile management
- Favorite job management
- Labor market analytics

## Features Overview

### Authentication
- User registration and login
- Secure token-based authentication
- Users must be logged in to save job listings and manage favorites

### Job Search
- Real-time job search with filters (job type and experience)
- Pagination support
- Personalized job recommendations (for logged-in users)

### Market Analytics
- **Overview Dashboard** - General market statistics
  - Top 10 programming languages
  - Top 5 cities
  - Job types distribution
  - Top 10 soft skills
  - Top 10 hard skills
  
- **Domain Dashboard** - Domain-specific insights
  - Domains available for selection: Web, Mobile, DevOps, Data, QA & Security, Design, Management
  - Top 5 cities by domain
  - Top 5 technologies by domain
  - Seniority distribution for job offers
  - Skills distribution radar chart

### User Management
- Profile customization
- Biography and interests
- Profile picture upload
- Favorite jobs management
- Theme preferences (Light/Dark mode)

### Admin Panel
- User management (view, edit, delete)
- Role assignment

## Technologies

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Context API
- **UI Components**: 
  - React Native Paper
  - Expo Vector Icons
  - React Native Gifted Charts
  - Radar Charts (@salmonco/react-native-radar-chart)
- **Data Fetching**: Axios
- **Storage**: 
  - Expo SecureStore (tokens)
  - AsyncStorage (user data)
- **Image Handling**: Expo Image Picker
- **Fonts**: Google Fonts (Poppins)

## Screens

- **Home** - Personalized job feed or recent postings
- **Jobs** - Search and filter job listings
- **Market** - Interactive analytics dashboards
- **Profile** - User profile and settings
- **Admin** - User management (admin only)
- **Details** - Individual job posting details
- **Favorites** - Saved job listings
- **Settings** - Theme preferences and logout
- **Login / Sign up** - Authentication

## Collaborators

- **Kristina Hristova Beneva** - Authentication, Figma design
- **Yislaine Yanell Perez Gracia** - User profile, settings
- **Leïa Plourde** - Job search, filtering, themes
- **Aya Issa** - Market analytics
- **Aïcha Rym Souane** - Favorites, job details

## Links

- **Figma Design**: [JobScope UI](https://www.figma.com/design/2DlADMSS6JSM79s7wyOxq6/JobScope?node-id=0-1&p=f&t=5HtndrcXqvOW7RfS-0)
- **Trello Board**: [Project Management](https://trello.com/b/ApVxyN82/jobscopefrontend)
- **Backend API Repository**: [JobScope API](https://github.com/LoulouPlou/JobScope-API)
- **Deployed API**: [jobscope-api.onrender.com](https://jobscope-api.onrender.com/)
