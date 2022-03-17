const express = require('express');

const {
    createUser,
    getUserById,
<<<<<<< HEAD
    loginUser
=======
    loginUser,
>>>>>>> 10b094d2794558db1c8d352f572350939f6e7e3a
} = require('../controllers/user.js');

const router = express.Router();

router.post('/register', createUser);

router.get('/:id', getUserById);

router.post('/login', loginUser); 

module.exports = router;