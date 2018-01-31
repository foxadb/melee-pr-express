const express = require('express');
const router = express.Router();

const PlayerController = require('../controllers/player.controller');
const UserController = require('../controllers/user.controller');

// Map GET controller functions
router.get('/', PlayerController.getPlayers);
router.get('/:id', PlayerController.getPlayer);

// Map POST controller functions
router.post('/', UserController.managerOnly, PlayerController.createPlayer);

// Map PUT controller functions
router.put('/', UserController.managerOnly, PlayerController.updatePlayer);

// Map DELETE controller functions
router.delete('/:id', UserController.managerOnly, PlayerController.deletePlayer);

// Export the Router
module.exports = router;