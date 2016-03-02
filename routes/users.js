'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
  console.log("/register post");
  User.register(req.body, function(err, user){
    console.log(user);
  }); 
})

module.exports = router;
