const express = require('express');
const router = express.Router();

// Getting the Match Controller that we just created
const MatchController = require('../controllers/match.controller');

// Map GET controller functions
router.get('/', MatchController.getMatches);
router.get('/:id', MatchController.getMatch);

// Map POST controller functions
router.post('/', MatchController.createMatch);
router.put('/', MatchController.updateMatch);

// Map DELETE controller functions
router.delete('/:id', MatchController.removeMatch);

// Export the Router
module.exports = router;