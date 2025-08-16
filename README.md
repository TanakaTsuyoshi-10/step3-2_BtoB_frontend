# Energy Management System - Frontend

React-based frontend application built with Next.js, providing an intuitive dashboard for energy monitoring and device management.

## Features

- **Responsive Dashboard**: Real-time energy monitoring with interactive charts
- **Device Management**: Add, edit, and monitor energy devices (solar panels, batteries, inverters)
- **Energy Analytics**: Track and analyze energy production, consumption, and grid interaction
- **User Authentication**: Secure JWT-based authentication
- **Mobile-First Design**: Fully responsive design with TailwindCSS
- **Data Visualization**: Interactive charts using Recharts
- **Real-time Updates**: Live energy data monitoring

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Data visualization library
- **Axios**: HTTP client for API communication
- **React Hook Form**: Form handling and validation
- **Lucide React**: Modern icon library

## Deployment Status

🚀 **Azure App Service Deployment**: Automated via GitHub Actions  
📦 **Build Mode**: Standalone (Mode A) with fallback to next start (Mode B)  
🔄 **Last Deploy**: Active deployment pipeline configured

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see backend repository)

### Installation

1. **Clone and setup**
   ```bash
   git clone https://github.com/TanakaTsuyoshi-10/step3-2_BtoB_frontend.git
   cd step3-2_BtoB_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Environment Configuration

Create a `.env.local` file with:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.azurewebsites.net
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/        # Authentication pages
│   │   ├── register/     # User registration
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and API clients
│   │   ├── api.ts        # API service layer
│   │   ├── auth.ts       # Authentication utilities
│   │   ├── axios.ts      # HTTP client configuration
│   │   └── utils.ts      # Common utilities
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
├── tailwind.config.js    # TailwindCSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Key Components

### Dashboard
- Real-time energy production and consumption metrics
- Interactive charts showing 24-hour energy flow
- Device status overview with visual indicators
- Daily summaries and efficiency metrics

### Device Management
- Add new energy devices (solar panels, batteries, inverters)
- Monitor device performance and status
- Edit device specifications and settings
- Track maintenance schedules

### Authentication
- User registration and login
- JWT token management
- Protected routes and automatic redirects

## API Integration

The frontend communicates with the backend API using a centralized service layer:

```typescript
// Example API calls
import { devicesAPI, energyRecordsAPI } from '@/lib/api';

// Fetch devices
const devices = await devicesAPI.getAll();

// Create energy record
const record = await energyRecordsAPI.create({
  device_id: 1,
  timestamp: new Date().toISOString(),
  energy_produced: 15.5,
  energy_consumed: 12.3
});
```

### API Services Available

- **authAPI**: Authentication (login, register, profile)
- **devicesAPI**: Device management (CRUD operations)
- **energyRecordsAPI**: Energy data (CRUD, analytics)

## Styling

The application uses TailwindCSS with a custom design system:

### Color Palette
- **Primary**: Blue tones for trust and technology
- **Success**: Green for renewable energy and positive metrics
- **Warning**: Orange for alerts and notifications
- **Danger**: Red for errors and critical alerts

### Custom Components
- Responsive cards with consistent styling
- Interactive charts with energy-specific color coding
- Form inputs with validation states
- Loading states and error handling

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Adding New Features

1. **Create Components**
   ```bash
   # Add components in src/components/
   # Follow existing patterns for consistency
   ```

2. **Add Pages**
   ```bash
   # Create new pages in src/app/
   # Use Next.js App Router conventions
   ```

3. **API Integration**
   ```bash
   # Extend API services in src/lib/api.ts
   # Add TypeScript types in src/types/
   ```

4. **Styling**
   ```bash
   # Use TailwindCSS utility classes
   # Follow existing component patterns
   ```

## Data Visualization

The dashboard uses Recharts for interactive data visualization:

- **Line Charts**: Energy production/consumption over time
- **Bar Charts**: Daily/monthly energy summaries
- **Real-time Updates**: Live data streaming
- **Responsive Design**: Charts adapt to screen size

## Authentication Flow

1. **Login/Register**: User authentication via API
2. **Token Storage**: JWT tokens stored in secure cookies
3. **Auto-refresh**: Automatic token validation
4. **Protected Routes**: Redirect unauthenticated users
5. **Logout**: Clean token removal and redirect

## Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Caching**: API response caching with React Query
- **Bundle Analysis**: Webpack bundle analyzer integration

## Deployment

### Azure Static Web Apps

1. **Create Static Web App**
   - Connect to GitHub repository
   - Configure build settings:
     - App location: `/`
     - Build location: `.next`
     - Output location: `out`

2. **Environment Variables**
   - Set `NEXT_PUBLIC_API_URL` in Azure Portal

3. **Automatic Deployment**
   - Pushes to main branch trigger automatic deployment

### Manual Deployment

```bash
# Build for production
npm run build

# Export static files (if needed)
npm run export

# Deploy build folder to your hosting provider
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on different screen sizes
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Verify backend API is running
   - Check CORS configuration

2. **Authentication Issues**
   - Clear browser cookies and localStorage
   - Verify JWT token format
   - Check token expiration

3. **Build Errors**
   - Clear `.next` directory
   - Delete `node_modules` and reinstall
   - Check TypeScript errors

## License

This project is licensed under the MIT License.# Trigger deployment - #午後
