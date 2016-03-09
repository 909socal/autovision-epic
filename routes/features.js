'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item'); 
var User = require('../models/user'); 
var multer = require('multer');
var fs = require('fs');
var upload = multer({ storage: multer.memoryStorage() });

router.get('/single/:featureId', function(req, res, next) {
  Feature.findById(req.params.featureId, function(err, feature) {
    res.status(err ? 400:200).send(err||feature);
  });
});

router.post('/:token', upload.array('images'), function(req, res, next) {
  console.log('req.body', req.body);
  console.log('req.files', req.files[0].buffer);
  req.body.image = base64EncodedBuffer;
  // Feature.add(req.body, req.params.token, function(err, savedFeature) {
  //   res.status(err ? 400:200).send(err||savedFeature);
  // }); 
});

router.delete('/:id', function(req, res, next) {
  Feature.findById(req.params.id, function(err, item){
    if(err) return res.status(400).send(err); 
    item.remove(function(err){
      res.status(err ? 400 : 200).send(err || item);
    });
  });
});

router.put('/:id', function(req, res, next) {
  console.log("put item", req.params.id);
  // Feature.findByIdAndUpdate(req.params.id, req.body, function(err, item){
  //   if(err) return res.status(400).send(err); 
  //   console.log("Found one,", item);    
  //   item.save(function(err, savedFeature){
  //     res.send(err || savedFeature);
  //   })
  // });
  Feature.findById(req.params.id, function(err, item){
    if(err) return res.status(400).send(err); 
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
    item.save(function(err, savedFeature){
      res.send(err || savedFeature);
    })
  });
});

module.exports = router;