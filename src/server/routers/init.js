const express = require('express');

const {
    seedBookDatabase
} = require('../controllers/init.js');

const router = express.Router();

router.post('/', seedBookDatabase);

module.exports = router;