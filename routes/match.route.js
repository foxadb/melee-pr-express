const express = require('express');
const router = express.Router();

const MatchController = require('../controllers/match.controller');
const UserController = require('../controllers/user.controller');

// Map GET controller functions
router.get('/', MatchController.getMatches);
router.get('/:id', MatchController.getMatch);

// Map POST controller functions
router.post('/', UserController.userOnly, MatchController.createMatch);
router.put('/', UserController.userOnly, MatchController.updateMatch);

// Map DELETE controller functions
router.delete('/:id', UserController.userOnly, MatchController.removeMatch);

// Export the Router
module.exports = router;