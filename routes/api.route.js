var express = require('express');
var router = express.Router();

var player = require('./player.route');
var match = require('./match.route');

router.use('/player', player);
router.use('match', match);

module.exports = router;