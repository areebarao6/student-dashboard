# GPA Calculator & AI Study Timer

A full-stack web application for calculating GPA and tracking study time with AI-powered insights.

## Features

- **GPA Calculator**: Calculate GPA for 2, 3, 4, 5, or 6 subjects with detailed grade breakdown
- **Study Timer**: Pomodoro technique timer (25 min study, 5 min break)
- **AI Insights**: Rule-based AI suggestions for academic improvement
- **Study Analysis**: Track and analyze your study time patterns
- **Modern UI**: Beautiful, responsive design with custom color scheme

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **API**: RESTful APIs for GPA calculation and study analysis

## Project Structure

```
gpa-web/
├── backend/
│   ├── controllers/
│   │   ├── gpaController.js
│   │   └── studyController.js
│   ├── routes/
│   │   ├── gpa.js
│   │   └── study.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── university-building.jpg (your background image)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.js
│   │   │   ├── Dashboard.js
│   │   │   ├── GPACalculator.js
│   │   │   ├── StudyTimer.js
│   │   │   └── AISuggestions.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are set):
```
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### GPA Endpoints

- `POST /api/gpa/calculate` - Calculate GPA
  - Body: `{ subjects: [{ name: string, marks: number }] }`
  - Returns: GPA, percentage, and subject details

- `POST /api/gpa/insights` - Get AI insights
  - Body: `{ gpa: number, subjects: array }`
  - Returns: Personalized insights and recommendations

### Study Endpoints

- `POST /api/study/analyze` - Analyze study time
  - Body: `{ sessions: array }`
  - Returns: Statistics and analysis

- `POST /api/study/suggestions` - Get study suggestions
  - Body: `{ gpa: number, studyTime: number, weakSubjects: array }`
  - Returns: Personalized study suggestions

## Color Scheme

- Cream: `#FEEAC9`
- Pink Light: `#FFCDC9`
- Pink: `#FDACAC`
- Pink Dark: `#FD7979`

## Usage

1. **Calculate GPA**: Enter subject names and marks (2-4 subjects), then click "Calculate GPA"
2. **Study Timer**: Use the Pomodoro timer to track focused study sessions
3. **View Insights**: After calculating GPA or completing study sessions, view AI-powered insights and suggestions

## License

ISC

