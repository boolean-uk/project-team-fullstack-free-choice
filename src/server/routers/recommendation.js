const express = require('express');

const {
    getRecommendations,
    createRecommendation
} = require('../controllers/recommendation.js');

const router = express.Router();

router.get('/:userId', getRecommendations);

router.post('/:userId', createRecommendation);

module.exports = router;