const express = require('express');

const {
    createUser,
    getUserById,
    loginUser,
    addBookToUser
} = require('../controllers/user.js');

const router = express.Router();

router.post('/register', createUser);

router.get('/:id', getUserById);

router.post('/login', loginUser); 

router.post('/:id/book', addBookToUser);

module.exports = router;