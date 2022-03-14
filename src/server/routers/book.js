const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByAuthor
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

router.get('/author/:author', getBookByAuthor);

module.exports = router;