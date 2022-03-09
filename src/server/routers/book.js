const express = require('express');

const {
    getAllBooks,
    getBookById
} = require('../controllers/book.js');

router.get("/", getAllBooks);

router.get("/:id", getBookById);

module.exports = router;