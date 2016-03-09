'use strict';

var express = require('express');
var router = express.Router();

var Autofeature = require('../models/autofeature'); 
var User = require('../models/user'); 
var multer = require('multer');
var fs = require('fs');
var upload = multer({ storage: multer.memoryStorage() });

router.get('/single/:featureId', function(req, res, next) {
  Autofeature.findById(req.params.featureId, function(err, feature) {
    res.status(err ? 400:200).send(err||feature);
  });
});

router.post('/:token', upload.array('images'), function(req, res, next) {
  console.log('req.body', req.body);
  console.log('req.files', req.files);
  if (req.files && req.files[0]) {
    req.body.image = req.files[0].buffer;
  };
  Autofeature.add(req.body, req.params.token, function(err, savedFeature) {
    res.status(err ? 400:200).send(err||savedFeature);
  }); 
  
});

router.delete('/:id', function(req, res, next) {
  Autofeature.findById(req.params.id, function(err, autofeature){
    if(err) return res.status(400).send(err); 
    autofeature.remove(function(err){
      res.status(err ? 400 : 200).send(err || autofeature);
    });
  });
});

router.put('/:id', function(req, res, next) {
  Autofeature.edit(req.body, req.params.id, function(err, autofeature){
    res.status(err ? 400 : 200).send(err || autofeature);
  })
});

module.exports = router;