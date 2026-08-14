<div align="center">

# UBIT Smart GPA Calculator

### AI-Powered GPA Calculation & Academic Recommendation System

<p>
  <a href="https://react.dev/">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" alt="React.js"/>
  </a>
  <a href="https://nodejs.org/">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45" alt="Node.js"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45" alt="Express.js"/>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="45" alt="JavaScript"/>
  </a>
</p>

<p>
  React.js &nbsp; · &nbsp;
  Node.js &nbsp; · &nbsp;
  Express.js &nbsp; · &nbsp;
  JavaScript &nbsp; · &nbsp;
  REST API &nbsp; · &nbsp;
  AI
</p>

</div>

---

## Overview

**UBIT Smart GPA Calculator** is a full-stack web application designed to simplify GPA calculation for university students.

The application allows students to enter their courses, credit hours, and grades to automatically calculate their semester GPA. It also provides AI-powered recommendations to help students better understand their academic performance.

---

## Features

### GPA Calculation

- Add courses and credit hours
- Select grades for each course
- Automatically calculate grade points
- Calculate semester GPA
- Handle multiple courses and credit-hour combinations

### AI-Powered Recommendations

- Analyze calculated GPA
- Provide personalized academic recommendations
- Help students understand their academic performance
- Generate useful suggestions based on GPA results

### User Interface

- Clean and intuitive interface
- Responsive design
- Interactive GPA calculation
- Clear presentation of results
- Optimized user experience

### Backend

- RESTful API architecture
- GPA processing through backend services
- Frontend-backend communication using APIs
- Structured server-side logic

---

## Technology Stack

### Frontend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" alt="React.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" alt="JavaScript"/>
</p>

**React.js**  
Component-based frontend architecture and interactive UI.

**JavaScript**  
Application logic, GPA calculations and client-side functionality.

---

### Backend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" alt="Node.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" alt="Express.js"/>
</p>

**Node.js**  
Server-side JavaScript runtime.

**Express.js**  
RESTful API development and backend request handling.

---

### API Communication

**REST APIs**  
Used for communication between the React frontend and Node.js backend.

---

### AI

**AI Integration**  
Used to generate academic recommendations based on GPA results.

> AI services can be configured through environment variables without exposing API credentials in the repository.

---

## Application Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│                          │
│  Course & Grade Input    │
│  GPA Calculation UI      │
│  Recommendation UI       │
└────────────┬─────────────┘
             │
             │ REST API
             ▼
┌──────────────────────────┐
│    Node.js + Express     │
│                          │
│    API Endpoints         │
│    GPA Processing        │
│    Business Logic        │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      AI Integration      │
│                          │
│ Academic Recommendations │
└──────────────────────────┘
