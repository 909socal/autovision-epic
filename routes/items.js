'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item'); 
var User = require('../models/user'); 
var authMiddleware = require('../config/auth');

router.get('/', function(req, res, next) {
  // console.log("getitems");
  Item.find({}, function(err, items) {
    // console.log("find items,", items);
    res.status(err ? 400:200).send(err||items);
  });
});

router.get('/single/:itemId', function(req, res, next) {
  console.log('inside single router file');
  Item.findById(req.params.itemId, function(err, item) {
    // console.log('item obtained in router file', item);
    res.status(err ? 400:200).send(err||item);
  });
});

// router.get('/:userid', function(req, res, next) {
//   Item.getUserItems(req.params.userid, function(err, userItems) {
//     res.status(err ? 400:200).send(err||userItems);
//   });
// });
router.get('/:token', function(req, res, next) {
  Item.getUserItems(req.params.token, function(err, userItems) {
    res.status(err ? 400:200).send(err||userItems);
  });
});


// router.post('/', authMiddleware, function(req, res, next) {
// router.post('/', function(req, res, next) {
//   console.log('reqbody', req.body);
//   // console.log('req.user', req.user);
//   // req.body.ownerObj = req.user; 
//   Item.add(req.body, function(err, savedItem){
//     console.log('Item.add in post route', savedItem);
//     res.status(err ? 400:200).send(err||savedItem);
//   }); 
// });

router.post('/:token', function(req, res, next) {
  console.log('reqbody', req.body);
  Item.add(req.body, req.params.token, function(err, savedItem){
    console.log('Item.add in post route', savedItem);
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
  // Item.findByIdAndUpdate(req.params.id, req.body, function(err, item){
  //   if(err) return res.status(400).send(err); 
  //   console.log("Found one,", item);    
  //   item.save(function(err, savedItem){
  //     res.send(err || savedItem);
  //   })
  // });
  Item.findById(req.params.id, function(err, item){
    if(err) return res.status(400).send(err); 
    console.log("Found one,", item);    
      item._id = req.body._id; 
      item.make = req.body.make; 
      item.model = req.body.model; 
      item.year = req.body.year; 
      item.description = req.body.description; 
      item.category = req.body.category; 
      if (req.body.contactinfo) {
        item.contactinfo.email = req.body.contactinfo.email;
        item.contactinfo.phone = req.body.contactinfo.phone;
        item.contactinfo.zip = req.body.contactinfo.zip;
      };
    item.save(function(err, savedItem){
      res.send(err || savedItem);
    })
  });
});

module.exports = router;
