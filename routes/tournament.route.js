const express = require('express');
const router = express.Router();

const TournamentController = require('../controllers/tournament.controller');
const UserController = require('../controllers/user.controller');

// Map GET controller functions
router.get('/', TournamentController.getTournaments);
router.get('/:id', TournamentController.getTournament);

// Map POST controller functions
router.post('/', UserController.userOnly, TournamentController.createTournament);
router.put('/', UserController.userOnly, TournamentController.updateTournament);

// Map DELETE controller functions
router.delete('/:id', UserController.userOnly, TournamentController.removeTournament);

// Export the Router
module.exports = router;