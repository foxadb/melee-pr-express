const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bluebird = require('bluebird');
const passport = require('passport');

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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', index);
app.use('/api', api);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
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
mongoose.connect('mongodb://127.0.0.1:27017/fr-melee-pr', { useMongoClient: true })
  .then(() => {
    console.log(`Succesfully connected to the MongoDB Database at: mongodb://127.0.0.1:27017/fr-melee-pr`);
  })
  .catch(() => {
    console.log(`Error Connecting to the MongoDB Database at: mongodb://127.0.0.1:27017/fr-melee-pr`);
  })

module.exports = app;