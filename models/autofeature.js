'use strict';
require('dotenv').config(); // Loads environment variables 
var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var multer = require('multer');

var s3 = new AWS.S3(); 

var Autofeature; 

var autofeatureSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:String},
  description:{type:String},
  category:{type:String},
  image:{
    key:{type:String},
    url:{type:String},
    name:{type:String}
  },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

autofeatureSchema.statics.getCommunityAutofeatures = function(cb) { 
  Autofeature.find({}, function(err, autofeatures) {
    if (err) return cb(err);
    cb(null, autofeatures); 
  }).populate("ownerObj");
};

autofeatureSchema.statics.getUserAutofeatures = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  Autofeature.find({ownerObj: userid}, function(err, autofeatures) {
    if (err) return cb(err);
    cb(null, autofeatures); 
  })
};

autofeatureSchema.statics.add = function(autofeature, file, token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 

  if (file) {
    var filename = file.originalname;  
    var imageBuffer = file.buffer;
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1() + ext;// Guarantee a unique name. + ext to account for different types of files 

    var imageToUpload = {
      Bucket:process.env.AWS_BUCKET,
      Key:key, 
      Body:imageBuffer 
    };

    s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;

      var newAutofeature = new Autofeature(autofeature); 
      newAutofeature.ownerObj = userid; 
      newAutofeature.image.key = key; 
      newAutofeature.image.url = url; 
      newAutofeature.image.name = filename; 
      newAutofeature.save(function(err, savedAutofeature){
        if (err) return cb(err);
        return cb(null, savedAutofeature); 
      });
    }); // s3.putObject()
  } else {    
    var newAutofeature = new Autofeature(autofeature); 
    newAutofeature.ownerObj = userid; 
    newAutofeature.save(function(err, savedAutofeature){
      if (err) return cb(err);   
      return cb(null, savedAutofeature); 
    });
  }

};

autofeatureSchema.statics.edit = function(autofeatureObj, autofeatureId, cb) {
  Autofeature.findById(autofeatureId, function(err, autofeature){
    if(err) return res.status(400).send(err); 
    autofeature._id = autofeatureObj._id; 
    autofeature.make = autofeatureObj.make; 
    autofeature.model = autofeatureObj.model; 
    autofeature.year = autofeatureObj.year; 
    autofeature.description = autofeatureObj.description; 
    autofeature.category = autofeatureObj.category; 
    if (autofeatureObj.contactinfo) {
      autofeature.contactinfo.email = autofeatureObj.contactinfo.email;
      autofeature.contactinfo.phone = autofeatureObj.contactinfo.phone;
      autofeature.contactinfo.zip = autofeatureObj.contactinfo.zip;
    };
    autofeature.save(function(err, savedAutofeature){
      if (err) return cb(err);
      cb(null, savedAutofeature); 
    })
  });
}

Autofeature = mongoose.model('Autofeature', autofeatureSchema);

module.exports = Autofeature;