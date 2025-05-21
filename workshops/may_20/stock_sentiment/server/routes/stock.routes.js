const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

// Get sentiment analysis for a stock
router.post('/analyze', stockController.analyzeSentiment);

// Get historical data for a stock
router.get('/:symbol/history', stockController.getHistoricalData);

// Get real-time stock price
router.get('/:symbol/price', stockController.getCurrentPrice);

module.exports = router; 