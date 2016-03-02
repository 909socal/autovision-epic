'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
  User.register(req.body, function(err, user){
    res.send(user);
  }); 
})

router.post('/login', function(req, res, next){
  User.authenticate(req.body, function(err, user){
    var token = user.token(); 
    res.send(token);
  }); 
})

module.exports = router;
