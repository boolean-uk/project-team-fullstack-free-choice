const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByAuthor,
    getBookByGenre,
    getBookByGroupId,
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

router.get('/author/:author', getBookByAuthor);

router.get('/genre/:genre', getBookByGenre);

router.get('/group/:id', getBookByGroupId);

module.exports = router;