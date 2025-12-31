const express = require('express');
const router = express.Router();
const { analyzeStudyTime, getStudySuggestions } = require('../controllers/studyController');

// Analyze study time
router.post('/analyze', analyzeStudyTime);

// Get study suggestions
router.post('/suggestions', getStudySuggestions);

module.exports = router;

