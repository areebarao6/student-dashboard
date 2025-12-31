# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server (development mode with auto-reload)
npm run dev

# Or start in production mode
npm start
```

The backend API will be available at `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

## Adding the University Building Background Image

The Hero section is configured to use a local image. To add your university building image:

1. Place your image file in `frontend/public/images/` directory
2. Name it `university-building.jpg` (or update the path in `Hero.js` if using a different name/format)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. The component will automatically use it. If the image isn't found, it will show a gradient fallback.

## Testing the Application

1. **GPA Calculator**:
   - Select number of subjects (2, 3, 4, 5, or 6)
   - Enter subject names and marks (0-100)
   - Click "Calculate GPA" to see results

2. **Study Timer**:
   - Click "Start" to begin a 25-minute Pomodoro session
   - Timer will automatically switch to a 5-minute break after study time
   - Completed sessions are tracked automatically

3. **AI Insights**:
   - Calculate your GPA first to see GPA insights
   - Complete study sessions to see study time analysis
   - View personalized suggestions based on your performance

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check that all dependencies are installed (`npm install`)

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env` file (should be `http://localhost:5000/api`)

### CORS errors
- Backend has CORS enabled by default
- If issues persist, check `backend/server.js` CORS configuration

## Production Build

### Frontend Production Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` folder.

### Backend Production

For production, use a process manager like PM2:

```bash
npm install -g pm2
cd backend
pm2 start server.js --name gpa-backend
```

