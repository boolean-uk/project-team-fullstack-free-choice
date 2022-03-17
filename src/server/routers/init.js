const express = require('express');

const {
    seedBookDatabase,
    seedUsers
} = require('../controllers/init.js');

const router = express.Router();

router.post('/', seedBookDatabase);

router.post('/user', seedUsers);

module.exports = router;