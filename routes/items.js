'use strict';

var express = require('express');
var router = express.Router();

var Item = reqiure('../models/item'); 
var User = reqiure('../models/user'); 


router.get('/', function(req, res, next) {
  Item.getAll(function(err, items){
    res.status(err ? 400:200).send(err||items);
  })
});

router.get('/:userid', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', User.isAuthenticated, function(req, res, next) {
  // console.log(req.user, '\nuserreq');
  Item.add(req.body, function(err, savedItem){
    res.status(err ? 400:200).send(err||savedItem);
  }); 
});


module.exports = router;
