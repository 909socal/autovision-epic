'use strict';

var express = require('express');
var router = express.Router();
var authMiddleware = require('../config/auth');
var User = require('../models/user');

router.get('/', authMiddleware, function(req, res, next) {
  console.log("Middlewherare? ");
  if (!req.user) { console.log("No user!"); return; };
  console.log('get user \n \n');
  User.findById(req.user._id, function(err, user) {
    console.log('found user!', user);
    res.send(user);
  });
})

router.post('/register', function(req, res, next){
  User.register(req.body, function(err, user){
    console.log('user in register backend:', user);
    res.send(user);
  });
})

router.post('/login', function(req, res, next){
  User.authenticate(req.body, function(err, user){
    // if (err) return res.send(err);
    if (err) return res.status(401).send(err);
    console.log("Hitting token");
    var token = user.token();
    res.cookie('token', token).send(token);
  });
})

module.exports = router;
