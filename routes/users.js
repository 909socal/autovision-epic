'use strict';

var express = require('express');
var router = express.Router();
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});
var User = require('../models/user');

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
    var token = user.token();
    res.status(200).send(token);
  });
})

router.put('/reset', function(req, res, next){
  User.reset(req.body, function(err, savedUser){
    res.send(savedUser);
  });
});

router.post('/forgotpassword', function(req, res, next){  
  User.forgotPassword(req.body.email, function(err, user){
    if(err) return res.status(401).send(err);
    res.send('Successfully sent forgot password email');
  });
});

module.exports = router;
