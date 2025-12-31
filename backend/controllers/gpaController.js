// GPA calculation logic matching: https://imshaheryar.byethost7.com/apps/gpa

const calculateGPA = (req, res) => {
  try {
    console.log('Received GPA calculation request:', req.body);
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects)) {
      console.error('Invalid request: subjects array is missing or not an array');
      return res.status(400).json({ error: 'Subjects array is required' });
    }

    if (subjects.length < 2 || subjects.length > 6) {
      return res.status(400).json({ error: 'Number of subjects must be between 2 and 6' });
    }

    // Validate each subject
    for (const subject of subjects) {
      if (!subject.name || subject.name.trim() === '') {
        return res.status(400).json({ error: 'Each subject must have a name' });
      }
      
      // Convert marks to number if it's a string
      const marks = typeof subject.marks === 'string' ? parseFloat(subject.marks) : Number(subject.marks);
      
      if (isNaN(marks) || marks < 0 || marks > 100) {
        return res.status(400).json({ error: `Marks must be a valid number between 0 and 100 for subject "${subject.name}". Received: ${subject.marks}` });
      }
    }

    // Calculate GPA based on the reference site logic
    // The reference site uses a specific grading scale
    let totalPoints = 0;
    let totalCredits = 0;
    const subjectResults = [];

    subjects.forEach((subject) => {
      // Ensure marks is a number
      const marks = typeof subject.marks === 'string' ? parseFloat(subject.marks) : Number(subject.marks);
      let grade = '';
      let points = 0;
      const credits = 1; // Assuming 1 credit per subject

      // GPA calculation logic matching the reference site
      if (marks >= 90) {
        grade = 'A+';
        points = 4.0;
      } else if (marks >= 85) {
        grade = 'A';
        points = 4.0;
      } else if (marks >= 80) {
        grade = 'A-';
        points = 3.8;
      } else if (marks >= 75) {
        grade = 'B+';
        points = 3.4;
      } else if (marks >= 71) {
        grade = 'B';
        points = 3.0;
      } else if (marks >= 68) {
        grade = 'B-';
        points = 2.8;
      } else if (marks >= 64) {
        grade = 'C+';
        points = 2.4;
      } else if (marks >= 61) {
        grade = 'C';
        points = 2.0;
      } else if (marks >= 57) {
        grade = 'C-';
        points = 1.8;
      } else if (marks >= 53) {
        grade = 'D+';
        points = 1.;
      } else if (marks >= 50) {
        grade = 'D';
        points = 1.0;
      } else {
        grade = 'F';
        points = 0.0;
      }

      totalPoints += points * credits;
      totalCredits += credits;

      subjectResults.push({
        name: subject.name,
        marks: marks,
        grade: grade,
        points: points,
        credits: credits
      });
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    const percentage = (parseFloat(gpa) / 4.0) * 100;

    const result = {
      success: true,
      gpa: parseFloat(gpa),
      percentage: parseFloat(percentage.toFixed(2)),
      totalPoints: totalPoints.toFixed(2),
      totalCredits: totalCredits,
      subjects: subjectResults
    };
    
    console.log('GPA calculation result:', result);
    res.json(result);
  } catch (error) {
    console.error('GPA calculation error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

const getGPAInsights = (req, res) => {
  try {
    const { gpa, subjects } = req.body;

    if (typeof gpa !== 'number') {
      return res.status(400).json({ error: 'GPA is required' });
    }

    const insights = [];
    let overallMessage = '';

    // Overall GPA analysis
    if (gpa >= 3.7) {
      overallMessage = 'Excellent! You\'re performing at the highest level. Keep up the outstanding work!';
      insights.push({
        type: 'success',
        title: 'Outstanding Performance',
        message: 'Your GPA indicates exceptional academic achievement.'
      });
    } else if (gpa >= 3.3) {
      overallMessage = 'Great job! You\'re doing very well. Continue maintaining this strong performance.';
      insights.push({
        type: 'success',
        title: 'Strong Performance',
        message: 'You\'re consistently performing above average.'
      });
    } else if (gpa >= 3.0) {
      overallMessage = 'Good work! You\'re on the right track. Focus on areas where you can improve.';
      insights.push({
        type: 'info',
        title: 'Good Performance',
        message: 'You\'re meeting expectations. Consider setting higher goals.'
      });
    } else if (gpa >= 2.5) {
      overallMessage = 'You have room for improvement. Identify weak subjects and focus on them.';
      insights.push({
        type: 'warning',
        title: 'Needs Improvement',
        message: 'Focus on improving your lower-scoring subjects.'
      });
    } else {
      overallMessage = 'Consider seeking additional help and dedicating more time to studies.';
      insights.push({
        type: 'error',
        title: 'Requires Attention',
        message: 'Your GPA needs significant improvement. Consider tutoring or study groups.'
      });
    }

    // Subject-specific insights
    if (subjects && Array.isArray(subjects)) {
      const weakSubjects = subjects.filter(s => s.points < 2.0);
      const strongSubjects = subjects.filter(s => s.points >= 3.5);

      if (weakSubjects.length > 0) {
        insights.push({
          type: 'warning',
          title: 'Focus Areas',
          message: `Consider spending more time on: ${weakSubjects.map(s => s.name).join(', ')}`
        });
      }

      if (strongSubjects.length > 0) {
        insights.push({
          type: 'success',
          title: 'Strengths',
          message: `You're excelling in: ${strongSubjects.map(s => s.name).join(', ')}`
        });
      }

      // Balance analysis
      const points = subjects.map(s => s.points);
      const minPoints = Math.min(...points);
      const maxPoints = Math.max(...points);
      const difference = maxPoints - minPoints;

      if (difference > 1.5) {
        insights.push({
          type: 'info',
          title: 'Balance Suggestion',
          message: 'There\'s a significant gap between your best and worst subjects. Try to balance your performance across all subjects.'
        });
      }
    }

    // Study recommendations based on GPA
    if (gpa < 3.0) {
      insights.push({
        type: 'info',
        title: 'Study Recommendation',
        message: 'Consider increasing your daily study time and using the Pomodoro technique for better focus.'
      });
    }

    res.json({
      success: true,
      overallMessage,
      insights
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

module.exports = {
  calculateGPA,
  getGPAInsights
};

