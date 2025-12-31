import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const GPACalculator = ({ onCalculate, gpaData }) => {
  const [numSubjects, setNumSubjects] = useState(2);
  const [subjects, setSubjects] = useState([
    { name: '', marks: '' },
    { name: '', marks: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNumSubjectsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumSubjects(num);
    setSubjects(Array(num).fill(null).map((_, i) => 
      subjects[i] || { name: '', marks: '' }
    ));
    setError('');
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
    setError('');
  };

  const handleCalculate = async () => {
    setError('');
    
    // Validation
    if (subjects.some(s => !s.name.trim() || s.marks === '')) {
      setError('Please fill in all subject names and marks');
      return;
    }

    const marks = subjects.map(s => parseFloat(s.marks));
    if (marks.some(m => isNaN(m) || m < 0 || m > 100)) {
      setError('Marks must be numbers between 0 and 100');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        subjects: subjects.map(s => ({
          name: s.name.trim(),
          marks: parseFloat(s.marks)
        }))
      };
      
      console.log('Sending GPA calculation request:', payload);
      
      const response = await axios.post(`${API_URL}/gpa/calculate`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('GPA calculation response:', response.data);
      onCalculate(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('GPA calculation error:', err);
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to calculate GPA. Please check if the backend server is running.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">GPA Calculator</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Subjects
        </label>
        <select
          value={numSubjects}
          onChange={handleNumSubjectsChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-dark focus:border-transparent"
        >
          <option value={2}>2 Subjects</option>
          <option value={3}>3 Subjects</option>
          <option value={4}>4 Subjects</option>
          <option value={5}>5 Subjects</option>
          <option value={6}>6 Subjects</option>
        </select>
      </div>

      <div className="space-y-4 mb-4">
        {subjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject {index + 1} Name
              </label>
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                placeholder={`Subject ${index + 1}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-dark focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marks (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={subject.marks}
                onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                placeholder="Marks"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-dark focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleCalculate}
        disabled={loading}
        className="w-full bg-pink-dark hover:bg-pink-dark/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Calculating...' : 'Calculate GPA'}
      </button>

      {gpaData && (
        <div className="mt-6 p-4 bg-gradient-to-br from-cream to-pink-light rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Results</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-dark">{gpaData.gpa}</div>
              <div className="text-sm text-gray-600">GPA (out of 4.0)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-dark">{gpaData.percentage}%</div>
              <div className="text-sm text-gray-600">Percentage</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Subject Details:</h4>
            {gpaData.subjects.map((subject, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white/50 rounded">
                <span className="font-medium">{subject.name}</span>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">{subject.marks}%</span>
                  <span className="font-semibold text-pink-dark">{subject.grade}</span>
                  <span className="text-sm text-gray-600">({subject.points})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GPACalculator;

