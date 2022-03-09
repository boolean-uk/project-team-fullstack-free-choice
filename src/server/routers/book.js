const express = require('express');

const {
    getAllBooks,
    getBookById,
    getBookByGenre
} = require('../controllers/book.js');

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.get("/genre/:genre", getBookByGenre);

module.exports = router;