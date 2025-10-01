# Instagram Influencer Profile Page

A comprehensive full-stack web application that showcases Instagram influencer data and insights in a clean, user-friendly interface. Built as a demonstration of modern web development skills including React frontend, Supabase backend, and data visualization capabilities.

Profile Overview

<img width="954" height="1041" alt="image" src="https://github.com/user-attachments/assets/791bad59-e835-4208-bc69-1053635e6cc8" />


## 🌟 Features

### Core Functionality
- **Influencer Profile Display** - Complete profile information with verified badges
- **Engagement Analytics** - Interactive charts showing performance metrics
- **Content Analysis** - AI-powered post and reel categorization with vibe classification
- **Audience Demographics** - Visual representation of follower demographics
- **Responsive Design** - Mobile-first approach with desktop optimization

### Technical Features
- **Real-time Data** - Backend API integration with fallback to mock data
- **Interactive Charts** - Built with Recharts for engagement visualization
- **Modal Views** - Detailed post and reel inspection
- **Content Filtering** - Filter posts by tags, vibe, and quality score
- **Loading States** - Smooth loading experience with skeleton components

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **ShadCN/UI** for component library
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Supabase** for database and edge functions
- **Hono** web framework for API endpoints
- **PostgreSQL** with key-value store pattern

### Development Tools
- **Vite** for build tooling
- **ESLint** for code quality
- **TypeScript** for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/instagram-influencer-profile.git
   cd instagram-influencer-profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The application requires Supabase configuration. You'll need to set up:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📊 API Endpoints

The backend provides the following endpoints:

### Influencer Data
- `GET /make-server-a4c6a9da/influencer/:username` - Get complete influencer profile and analytics

### Content Analysis
- `POST /make-server-a4c6a9da/analyze-content` - Analyze post content for tags and vibe
- `GET /make-server-a4c6a9da/engagement-metrics/:username` - Get detailed engagement analytics

### Data Scraping
- `POST /make-server-a4c6a9da/scrape-profile` - Scrape influencer profile data
- `POST /make-server-a4c6a9da/scrape-posts` - Scrape recent posts and reels

## 🏗️ Project Structure

```
├── App.tsx                 # Main application component
├── components/
│   ├── ProfileHeader.tsx   # Influencer profile display
│   ├── EngagementMetrics.tsx # Analytics charts and metrics
│   ├── PostsGrid.tsx       # Posts display with filtering
│   ├── ReelsSection.tsx    # Reels analysis and display
│   ├── AudienceDemographics.tsx # Demographic visualizations
│   ├── LoadingScreen.tsx   # Loading state component
│   └── ui/                 # ShadCN UI components
├── supabase/
│   └── functions/
│       └── server/         # Backend API implementation
├── styles/
│   └── globals.css         # Tailwind CSS configuration
└── utils/
    └── supabase/           # Supabase client configuration
```

## 🎨 Component Architecture

### ProfileHeader
- Displays influencer basic information
- Profile picture with fallback
- Follower counts and verification status
- Bio with social media styling

### EngagementMetrics
- Interactive line and bar charts
- Key performance indicators
- Growth rate visualization
- Detailed analytics view

### PostsGrid
- Masonry-style layout
- Content filtering by tags and vibes
- Modal view for detailed post analysis
- Quality score indicators

### ReelsSection
- Video thumbnail grid
- View count and engagement metrics
- Trend analysis and viral content identification

### AudienceDemographics
- Gender split pie chart
- Age group distribution
- Geographic audience breakdown
- Interactive demographic filters

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom design tokens defined in `styles/globals.css`. Key features:
- Custom color palette with dark mode support
- Typography scale with consistent spacing
- Component-specific styling patterns

### Supabase Integration
Backend services are configured through Supabase Edge Functions:
- Authentication (ready for implementation)
- Real-time data synchronization
- File storage for media content
- PostgreSQL database with KV store pattern

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px (Primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+ (Enhanced experience)

## 🧪 Testing

The application includes comprehensive mock data for development and testing:
- Sample influencer profiles
- Generated post and reel data
- Realistic engagement metrics
- Demographic data for visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use conventional commit messages
- Maintain responsive design principles
- Test on multiple screen sizes
- Document new components and APIs

