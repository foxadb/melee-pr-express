const express = require('express');
const router = express.Router();

// Getting the Tournament Controller that we just created
const TournamentController = require('../controllers/tournament.controller');

// Map GET controller functions
router.get('/', TournamentController.getTournaments);
router.get('/:id', TournamentController.getTournament);

// Map POST controller functions
router.post('/', TournamentController.createTournament);
router.put('/', TournamentController.updateTournament);

// Map DELETE controller functions
router.delete('/:id', TournamentController.removeTournament);

// Export the Router
module.exports = router;