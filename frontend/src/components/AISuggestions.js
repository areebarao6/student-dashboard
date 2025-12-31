import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AISuggestions = ({ gpaData, studySessions }) => {
  const [insights, setInsights] = useState([]);
  const [studyAnalysis, setStudyAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (gpaData) {
        setLoading(true);
        try {
          const response = await axios.post(`${API_URL}/gpa/insights`, {
            gpa: gpaData.gpa,
            subjects: gpaData.subjects
          });
          setInsights(response.data.insights || []);
        } catch (error) {
          console.error('Failed to fetch insights:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInsights();
  }, [gpaData]);

  useEffect(() => {
    const fetchStudyAnalysis = async () => {
      if (studySessions.length > 0) {
        try {
          const response = await axios.post(`${API_URL}/study/analyze`, {
            sessions: studySessions
          });
          setStudyAnalysis(response.data);
        } catch (error) {
          console.error('Failed to fetch study analysis:', error);
        }
      }
    };

    fetchStudyAnalysis();
  }, [studySessions]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (gpaData || studySessions.length > 0) {
        try {
          const weakSubjects = gpaData?.subjects
            ?.filter(s => s.points < 2.0)
            ?.map(s => s.name) || [];
          
          const todayMinutes = studySessions
            .filter(s => {
              const sessionDate = new Date(s.date);
              const today = new Date();
              return sessionDate.toDateString() === today.toDateString();
            })
            .reduce((sum, s) => sum + (s.duration || 0), 0);

          const response = await axios.post(`${API_URL}/study/suggestions`, {
            gpa: gpaData?.gpa,
            studyTime: todayMinutes,
            weakSubjects
          });
          setSuggestions(response.data.suggestions || []);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
        }
      }
    };

    fetchSuggestions();
  }, [gpaData, studySessions]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'priority':
        return 'bg-purple-100 border-purple-400 text-purple-800';
      case 'focus':
        return 'bg-blue-100 border-blue-400 text-blue-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Insights & Suggestions</h2>

      {loading && (
        <div className="text-center py-4 text-gray-600">Loading insights...</div>
      )}

      {insights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">GPA Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getTypeColor(insight.type)}`}
              >
                <h4 className="font-semibold mb-1">{insight.title}</h4>
                <p className="text-sm">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {studyAnalysis && (
        <div className="mb-6 p-4 bg-gradient-to-br from-cream to-pink-light rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Study Time Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-dark">{studyAnalysis.totalHours}h</div>
              <div className="text-xs text-gray-600">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-dark">{studyAnalysis.todayMinutes}m</div>
              <div className="text-xs text-gray-600">Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-dark">{studyAnalysis.dailyAverage}h</div>
              <div className="text-xs text-gray-600">Daily Avg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-dark">{studyAnalysis.totalSessions}</div>
              <div className="text-xs text-gray-600">Sessions</div>
            </div>
          </div>
          {studyAnalysis.analysis && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1">
                <strong>{studyAnalysis.analysis.message}</strong>
              </p>
              <p className="text-sm text-gray-600">{studyAnalysis.analysis.recommendation}</p>
              <p className="text-xs text-gray-500 mt-1">
                Consistency: {studyAnalysis.analysis.consistency}
              </p>
            </div>
          )}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Study Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getTypeColor(suggestion.type)}`}
              >
                <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                <p className="text-sm mb-2">{suggestion.message}</p>
                {suggestion.action && (
                  <p className="text-xs italic text-gray-700">💡 {suggestion.action}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!gpaData && studySessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Calculate your GPA or start a study session to see AI-powered insights!</p>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;

