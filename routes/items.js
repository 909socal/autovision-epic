'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item'); 
var User = require('../models/user'); 
var multer = require('multer');
var fs = require('fs');
var upload = multer({ storage: multer.memoryStorage() });

router.get('/', function(req, res, next) {
  Item.find({}, function(err, items) {
    res.status(err ? 400:200).send(err||items);
  });
});

router.get('/single/:itemId', function(req, res, next) {
  Item.findById(req.params.itemId, function(err, item) {
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

// router.post('/', User.isAuthenticated, function(req, res, next) {
router.post('/:token', upload.array('images'), function(req, res, next) {
  var base64EncodedBuffer = new Buffer(req.files[0].buffer, 'base64').toString('ascii');
  console.log('req.body', req.body);
  console.log('req.files', req.files[0].buffer);
  req.body.image = base64EncodedBuffer;
  Item.add(req.body, req.params.token, function(err, savedItem) {
    res.status(err ? 400:200).send(err||savedItem);
  }); 
});

router.delete('/:id', function(req, res, next) {

  Item.findById(req.params.id, function(err, item){
    if(err) return res.status(400).send(err); 
    item.remove(function(err){
      res.status(err ? 400 : 200).send(err || item);
    });
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

  
  
  Item.edit(req.body, req.params.id, function(err, item){
    res.status(err ? 400 : 200).send(err || item);
  })
  
});

module.exports = router;
