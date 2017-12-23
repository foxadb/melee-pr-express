var express = require('express');
var router = express.Router();

// Getting the Player Controller that we just created
var PlayerController = require('../controllers/player.controller');

// Map GET controller functions
router.get('/', PlayerController.getPlayers);
router.get('/:id', PlayerController.getPlayer);

// Map POST controller functions
router.post('/', PlayerController.createPlayer);
router.put('/', PlayerController.updatePlayer);

// Map DELETE controller functions
router.delete('/:id', PlayerController.removePlayer);

// Export the Router
module.exports = router;