const express = require('express');

const { 
    createRecommendation, 
    getUsersRecommendations
} = require('../controllers/recommendation.js');

const router = express.Router();

router.post('/', createRecommendation);

router.get('/:userId', getUsersRecommendations)

module.exports = router;