import React, { useState } from 'react';
import Hero from './components/Hero';
import GPACalculator from './components/GPACalculator';
import StudyTimer from './components/StudyTimer';
import AISuggestions from './components/AISuggestions';
import Dashboard from './components/Dashboard';

function App() {
  const [gpaData, setGpaData] = useState(null);
  const [studySessions, setStudySessions] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-light to-pink">
      <Hero />
      <Dashboard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GPACalculator onCalculate={setGpaData} gpaData={gpaData} />
          <StudyTimer 
            onSessionComplete={(session) => {
              setStudySessions(prev => [...prev, session]);
            }}
            sessions={studySessions}
          />
        </div>
        <AISuggestions gpaData={gpaData} studySessions={studySessions} />
      </Dashboard>
    </div>
  );
}

export default App;

