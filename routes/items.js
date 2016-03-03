'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item'); 
var User = require('../models/user'); 


router.get('/', function(req, res, next) {
  console.log("getitems");
  Item.find({}, function(err, items) {
    console.log("find items,", items);
    res.status(err ? 400:200).send(err||items);
  });
});

router.get('/:userid', function(req, res, next) {
  Item.getUserItems(req.params.userid, function(err, userItems) {
    res.status(err ? 400:200).send(err||userItems);
  });
});

// router.post('/', User.isAuthenticated, function(req, res, next) {
router.post('/', function(req, res, next) {
  // console.log(req.user, '\nuserreq');
  console.log('reqbody', req.body);
  Item.add(req.body, function(err, savedItem){
    console.log('Item.add');
    res.status(err ? 400:200).send(err||savedItem);
  }); 
});


module.exports = router;