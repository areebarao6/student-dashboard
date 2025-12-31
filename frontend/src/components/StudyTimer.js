import React, { useState, useEffect, useRef, useCallback } from 'react';

const StudyTimer = ({ onSessionComplete, sessions }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef(null);
  const isBreakRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isBreakRef.current = isBreak;
  }, [isBreak]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    
    setCompletedPomodoros(prev => {
      if (!isBreakRef.current) {
        // Study session completed
        const newPomodoros = prev + 1;
        
        // Save session
        const session = {
          date: new Date().toISOString(),
          duration: 25, // minutes
          type: 'pomodoro'
        };
        onSessionComplete(session);

        // Start break
        setIsBreak(true);
        setMinutes(5);
        setSeconds(0);
        return newPomodoros;
      } else {
        // Break completed, reset to study
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
        return prev;
      }
    });
  }, [onSessionComplete]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          
          // Seconds reached 0, check minutes
          setMinutes(prevMinutes => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            }
            // Timer completed - don't call here, let the effect handle it
            return 0;
          });
          
          return 59;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Check for timer completion
  useEffect(() => {
    if (isRunning && minutes === 0 && seconds === 0) {
      handleTimerComplete();
    }
  }, [isRunning, minutes, seconds, handleTimerComplete]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleSkipBreak = () => {
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (m, s) => {
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalStudyTime = (sessions || []).reduce((sum, s) => sum + (s.duration || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Timer</h2>
      
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 ${isBreak ? 'text-green-600' : 'text-pink-dark'}`}>
          {formatTime(minutes, seconds)}
        </div>
        <div className="text-lg font-semibold text-gray-600">
          {isBreak ? 'Break Time' : 'Study Time'}
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-pink-dark hover:bg-pink-dark/90 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Reset
        </button>
        {isBreak && (
          <button
            onClick={handleSkipBreak}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Skip Break
          </button>
        )}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-br from-cream to-pink-light rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-dark">{completedPomodoros}</div>
            <div className="text-sm text-gray-600">Completed Pomodoros</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-dark">{totalStudyTime}</div>
            <div className="text-sm text-gray-600">Total Study Time (min)</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="text-center">
          <strong>Pomodoro Technique:</strong> 25 min study → 5 min break
        </p>
      </div>
    </div>
  );
};

export default StudyTimer;

