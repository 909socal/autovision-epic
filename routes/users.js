'use strict';

var express = require('express');
var router = express.Router();
var authMiddleware = require('../config/auth');
var User = require('../models/user'); 


/* GET users listing. */
// router.get('/', User.isAuthenticated, function(req, res, next) {
//   console.log('USERS GET');
//   // User.isAuthenticated(req, res, function(err, token){
//   //   if (err) return res.send(err);
//   //   console.log('OKTKEN ', token);
//   //   // res.send(token);
//   //   res.send(req.user);
//   // })
//   res.send(req.user);
// });

router.get('/', authMiddleware, function(req, res, next) {
  console.log("Middlewherare? ");
  if (!req.user) { console.log("No user!"); return; };
  console.log('get user \n \n');
  User.findById(req.user._id, function(err, user) {
    console.log('found user!', user);
    res.send(user); 
  });
  // res.send(req.user);
})

router.post('/register', function(req, res, next){
  User.register(req.body, function(err, user){
    res.send(user);
  }); 
})

router.post('/login', function(req, res, next){
  User.authenticate(req.body, function(err, user){
    var token = user.token(); 
    res.cookie('token', token).send(token);
  }); 
})

module.exports = router;
