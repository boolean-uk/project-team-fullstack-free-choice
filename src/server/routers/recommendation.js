const express = require('express');

const {
    getRecommendations,
    createRecommendation
} = require('../controllers/recommendation.js');

const router = express.Router();

router.get('/', getRecommendations);

router.post('/', createRecommendation);

module.exports = router;