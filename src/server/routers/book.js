const express = require('express');

const {
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByAuthorId,
    getBookByGroupId
} = require('../controllers/book.js');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBook);

router.get('/author/:id', getBookByAuthorId);

router.get('/group/:id', getBookByGroupId);

module.exports = router;