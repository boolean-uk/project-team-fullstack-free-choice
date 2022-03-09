const express = require('express');

const {
    createUser,
    getUserById,
    loginUser
} = require('../controllers/user.js');

const router = express.Router();

router.post('/register', createUser);

router.get('/:id', getUserById);

router.post('/login', loginUser);






module.exports = router;