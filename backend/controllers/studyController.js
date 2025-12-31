const analyzeStudyTime = (req, res) => {
  try {
    const { sessions } = req.body;

    if (!sessions || !Array.isArray(sessions)) {
      return res.status(400).json({ error: 'Sessions array is required' });
    }

    if (sessions.length === 0) {
      return res.json({
        success: true,
        totalMinutes: 0,
        totalHours: 0,
        averageSessionLength: 0,
        totalSessions: 0,
        analysis: {
          message: 'No study sessions recorded yet. Start your first session!',
          recommendation: 'Aim for at least 2-3 hours of focused study per day.'
        }
      });
    }

    // Calculate statistics
    const totalMinutes = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
    const totalHours = (totalMinutes / 60).toFixed(2);
    const averageSessionLength = (totalMinutes / sessions.length).toFixed(2);
    const totalSessions = sessions.length;

    // Analyze patterns
    const today = new Date();
    const todaySessions = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate.toDateString() === today.toDateString();
    });

    const todayMinutes = todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0);

    // Weekly analysis
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSessions = sessions.filter(s => new Date(s.date) >= weekAgo);
    const weekMinutes = weekSessions.reduce((sum, s) => sum + (s.duration || 0), 0);

    // Generate analysis
    let analysis = {
      message: '',
      recommendation: '',
      consistency: ''
    };

    if (todayMinutes >= 120) {
      analysis.message = 'Great job today! You\'ve put in excellent study time.';
    } else if (todayMinutes >= 60) {
      analysis.message = 'Good progress today. Keep it up!';
    } else if (todayMinutes > 0) {
      analysis.message = 'You\'ve started studying today. Try to extend your sessions.';
    } else {
      analysis.message = 'No study time recorded today. Start a session now!';
    }

    const dailyAverage = weekSessions.length > 0 ? (weekMinutes / 7).toFixed(2) : 0;
    
    if (parseFloat(dailyAverage) >= 120) {
      analysis.recommendation = 'You\'re maintaining excellent study habits. Continue this consistency!';
      analysis.consistency = 'Excellent';
    } else if (parseFloat(dailyAverage) >= 90) {
      analysis.recommendation = 'Good consistency. Try to aim for 2+ hours daily.';
      analysis.consistency = 'Good';
    } else if (parseFloat(dailyAverage) >= 60) {
      analysis.recommendation = 'You\'re building good habits. Increase your daily study time gradually.';
      analysis.consistency = 'Moderate';
    } else {
      analysis.recommendation = 'Try to study for at least 1-2 hours daily for better results.';
      analysis.consistency = 'Needs Improvement';
    }

    res.json({
      success: true,
      totalMinutes: Math.round(totalMinutes),
      totalHours: parseFloat(totalHours),
      averageSessionLength: parseFloat(averageSessionLength),
      totalSessions,
      todayMinutes: Math.round(todayMinutes),
      weekMinutes: Math.round(weekMinutes),
      dailyAverage: parseFloat(dailyAverage),
      analysis
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

const getStudySuggestions = (req, res) => {
  try {
    const { gpa, studyTime, weakSubjects } = req.body;

    const suggestions = [];

    // GPA-based suggestions
    if (gpa && gpa < 3.0) {
      suggestions.push({
        type: 'priority',
        title: 'Increase Study Time',
        message: 'Your GPA suggests you need more focused study time. Aim for 2-3 hours daily.',
        action: 'Use the Pomodoro timer to break study sessions into manageable chunks.'
      });
    }

    // Study time-based suggestions
    if (studyTime && studyTime < 60) {
      suggestions.push({
        type: 'warning',
        title: 'Low Study Time',
        message: 'You\'re studying less than 1 hour per day. Increase to at least 90 minutes for better results.',
        action: 'Try 3 Pomodoro sessions (25 min each) with 5-minute breaks.'
      });
    } else if (studyTime && studyTime >= 120) {
      suggestions.push({
        type: 'success',
        title: 'Excellent Study Habits',
        message: 'You\'re maintaining great study time. Keep up the consistency!',
        action: 'Continue your current routine and focus on quality over quantity.'
      });
    }

    // Subject-specific suggestions
    if (weakSubjects && weakSubjects.length > 0) {
      suggestions.push({
        type: 'focus',
        title: 'Focus on Weak Subjects',
        message: `Dedicate extra time to: ${weakSubjects.join(', ')}`,
        action: 'Allocate 40% of your study time to these subjects.'
      });
    }

    // General study tips
    suggestions.push({
      type: 'tip',
      title: 'Study Technique',
      message: 'Use active recall and spaced repetition for better retention.',
      action: 'Review material after 1 day, 3 days, and 1 week.'
    });

    suggestions.push({
      type: 'tip',
      title: 'Break Strategy',
      message: 'Take regular breaks to maintain focus and prevent burnout.',
      action: 'Follow the Pomodoro technique: 25 min study, 5 min break.'
    });

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

module.exports = {
  analyzeStudyTime,
  getStudySuggestions
};

