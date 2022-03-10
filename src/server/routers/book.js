const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByTag
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

router.get('/tag/:tag', getBookByTag);

module.exports = router;