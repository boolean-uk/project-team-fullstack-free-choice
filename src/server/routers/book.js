const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

module.exports = router;