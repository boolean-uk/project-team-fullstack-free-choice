const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByAuthor,
    getBookByGenre
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

router.get('/author/:author', getBookByAuthor);

router.get('/genre/:genre', getBookByGenre);

module.exports = router;