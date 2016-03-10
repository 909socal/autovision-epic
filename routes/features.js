'use strict';

var express = require('express');
var router = express.Router();

var Autofeature = require('../models/autofeature'); 
var User = require('../models/user'); 
var multer = require('multer');
var fs = require('fs');
var upload = multer({ storage: multer.memoryStorage() });

/* Get all the user's autofeatures */
router.get('/:token', function(req, res, next) {
  console.log('in get route of autofeatures');
  Autofeature.getUserAutofeatures(req.params.token, function(err, userAutofeatures) {
    res.status(err ? 400:200).send(err||userAutofeatures);
  });
});

/* Get a single autofeature */
router.get('/single/:featureId', function(req, res, next) {
  Autofeature.findById(req.params.featureId, function(err, feature) {
    res.status(err ? 400:200).send(err||feature);
  });
});

/* Create an autofeature */
router.post('/:token', upload.array('images'), function(req, res, next) {
  // console.log('req.body', req.body);
  // console.log('req.files', req.files);
  if (req.files && req.files[0]) {
    req.body.image = req.files[0].buffer;
  };
  Autofeature.add(req.body, req.params.token, function(err, savedFeature) {
    res.status(err ? 400:200).send(err||savedFeature);
  }); 
  
});

/* Remove an autofeature */
router.delete('/:id', function(req, res, next) {
  Autofeature.findById(req.params.id, function(err, autofeature){
    if(err) return res.status(400).send(err); 
    autofeature.remove(function(err){
      res.status(err ? 400 : 200).send(err || autofeature);
    });
  });
});

/* Edit an autofeature */
router.put('/:id', function(req, res, next) {
  Autofeature.edit(req.body, req.params.id, function(err, autofeature){
    res.status(err ? 400 : 200).send(err || autofeature);
  })
});

module.exports = router;