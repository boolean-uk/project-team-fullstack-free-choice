const express = require('express');

const {
    addBookToDB
} = require('../controllers/init.js');

const router = express.Router();

router.post('/', addBookToDB);

module.exports = router;