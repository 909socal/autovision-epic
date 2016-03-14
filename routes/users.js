'use strict';

var express = require('express');
var router = express.Router();
var authMiddleware = require('../config/auth');
var User = require('../models/user');

var api_key = 'key-50a933ab7e14e4cc21f23d9dbe377bdc';
var domain = 'sandbox19714487a4e84db7abe48144d77098b7.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.get('/', authMiddleware, function(req, res, next) {
  if (!req.user) { console.log("No user!"); return; };
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
})

router.post('/register', function(req, res, next){
  User.register(req.body, function(err, user){
    var data = {
      from: 'Autovision <mdeggies@sandbox19714487a4e84db7abe48144d77098b7.mailgun.org>', //sent from here
      to: user.email,
      subject: 'Thanks for Registering at AutoVision!',
      text: 'https://autovision.herokuapp.com/#/'
    };
    mailgun.messages().send(data, function (error, body) {
      console.log('mailgun data:',body);
    });
    res.send(user);
  });
})

router.post('/login', function(req, res, next){
  User.authenticate(req.body, function(err, user){
    if (err) return res.status(401).send(err);
    console.log('user:',user);
    var token = user.token();
    res.cookie('token', token).send(token);
  });
})

router.put('/reset', function(req, res, next){
  console.log('RESET ROUTE', req.body);
  User.reset(req.body, function(err, savedUser){
    console.log('successful password update in route', savedUser);
    res.send(savedUser);
  });
});

module.exports = router;
