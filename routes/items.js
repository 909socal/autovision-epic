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
  console.log('reqbody', req.body);
  Item.add(req.body, function(err, savedItem){
    console.log('Item.add');
    res.status(err ? 400:200).send(err||savedItem);
  }); 
});

router.delete('/:id', function(req, res, next) {
  console.log("post item", req.params.id);
  Item.findById(req.params.id, function(err, item){
    if(err) return res.status(400).send(err); 
    console.log("Found one,", item);
    item.remove(function(err){
      res.status(err ? 400 : 200).send(err || item);
    })
  });
});

router.put('/:id', function(req, res, next) {
  console.log("put item", req.params.id);
  Item.findByIdAndUpdate(req.params.id, req.body, function(err, item){
    if(err) return res.status(400).send(err); 
    console.log("Found one,", item);
    // item.iscomplete = !item.iscomplete; 
    item.save(function(err, savedItem){
      res.send(err || savedItem);
    })
  });
});

module.exports = router;
