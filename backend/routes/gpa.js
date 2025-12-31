const express = require('express');
const router = express.Router();
const { calculateGPA, getGPAInsights } = require('../controllers/gpaController');

// Calculate GPA
router.post('/calculate', calculateGPA);

// Get AI insights
router.post('/insights', getGPAInsights);

module.exports = router;

