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

router.get('/:token', function(req, res, next) {
  Item.getUserItems(req.params.token, function(err, userItems) {
    res.status(err ? 400:200).send(err||userItems);
  });
});

router.post('/:token', upload.array('images'), function(req, res, next) {
  // var image = {}; 
  // if (req.files && req.files[0]) {
  //   image = req.files[0];
  // };
  Item.add(req.body, req.files[0], req.params.token, function(err, savedItem) {
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
  Item.edit(req.body, req.params.id, function(err, item){
    res.status(err ? 400 : 200).send(err || item);
  })
});

module.exports = router;
