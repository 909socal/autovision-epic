'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// GLOBALS
var MONGO_URL = process.env.MONGOLAB_URI;
var JWT_SECRET = process.env.JWT_SECRET;

var mongoUrl = MONGO_URI || 'mongodb://localhost/autovision';
var mongoose = require('mongoose');
mongoose.connect(mongoUrl, function(err) {
  console.log(err || `Connected to MongoDB: ${mongoUrl}`);
});

//if (!mongoUrl) throw new Error('MongoURL required');
//if (!JWT_SECRET) throw new Error('JWT_SECRET required');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/logo-favicon.png'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/features', require('./routes/features'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
