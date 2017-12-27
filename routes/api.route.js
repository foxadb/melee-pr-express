const express = require('express');
const router = express.Router();

const player = require('./player.route');
const match = require('./match.route');
const tournament = require('./tournament.route');
const user = require('./user.route');

router.use('/player', player);
router.use('/match', match);
router.use('/tournament', tournament);
router.use('/user', user);

module.exports = router;