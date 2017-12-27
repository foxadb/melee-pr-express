const express = require('express');
const router = express.Router();

// Getting the User Controller that we just created
const UserController = require('../controllers/user.controller');

// Map GET function
router.get('/', UserController.loginRequired, UserController.getUsers);

// Map Register POST function
router.post('/register', UserController.register);
router.post('/signin', UserController.signIn);

// Export the Router
module.exports = router;