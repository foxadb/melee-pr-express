var express = require('express');
var passport = require('passport');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Melee PR API' });
});

module.exports = router;