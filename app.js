const express = require('express');
const path = require('path');
const config = require('config');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bluebird = require('bluebird');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const index = require('./routes/index');
const api = require('./routes/api.route');

const app = express();

console.log("Creating node server on http://localhost:3000");

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Configuration for Angular 4 Front-End
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Authentication with JSON Web Token
app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.get('jwtsecret'), function (err, decode) {
      if (err) {
        req.user = undefined;
      } else {
        req.user = decode;
      }
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// Initialize routes
app.use('/', index);
app.use('/api', api);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// MongoDB
const mongoose = require('mongoose');
mongoose.Promise = bluebird;
var mongodbUrl = 'mongodb://' + config.get('mongodb.host') + ':' + config.get('mongodb.port') + '/' + config.get('mongodb.name');
mongoose.connect(mongodbUrl, { useMongoClient: true }).then(
  () => {
    console.log(`Succesfully connected to the MongoDB Database at: ${mongodbUrl}`);
  },
  err => {
    console.log(`Error Connecting to the MongoDB Database at: ${mongodbUrl}`);
  }
);


module.exports = app;