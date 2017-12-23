var express = require('express');
var router = express.Router();

var player = require('./player.route');
var match = require('./match.route');
var tournament = require('./tournament.route');

router.use('/player', player);
router.use('/match', match);
router.use('/tournament', tournament);

module.exports = router;