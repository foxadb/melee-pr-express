const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// Map GET function
router.get('/', UserController.adminOnly, UserController.getUsers);
router.get('/:id', UserController.adminOnly, UserController.getUser);

// Map Register and Login POST function
router.post('/register', UserController.adminOnly, UserController.registerUser);
router.post('/login', UserController.loginUser);

// Map PUT function
router.put('/', UserController.adminOnly, UserController.updateUser);

// Map DELETE function
router.delete('/:id', UserController.adminOnly, UserController.deleteUser);

// Export the Router
module.exports = router;