const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// Map GET function
router.get('/', UserController.adminOnly, UserController.getUsers);

// Map Register POST function
router.post('/register', UserController.adminOnly, UserController.register);
router.post('/login', UserController.login);

// Export the Router
module.exports = router;