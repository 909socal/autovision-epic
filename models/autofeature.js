'use strict';
require('dotenv').config(); // Loads environment variables 
var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');

var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var uuid = require('node-uuid');
var multer = require('multer');

var Autofeature; 

var autofeatureSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:Date},
  description:{type:String},
  category:{type:String},
  // image:{type:Buffer},
  image:{
    key:{type:String},
    url:{type:String},
    name:{type:String}
  },
  // contactinfo:{
  //   zip:{type:Number},
  //   email:{type:String},
  //   phone:{type:String}
  // },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

autofeatureSchema.statics.getUserAutofeatures = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  Autofeature.find({ownerObj: userid}, function(err, autofeatures) {
    if (err) return cb(err);
    cb(null, autofeatures); 
  })
};

// autofeatureSchema.statics.add = function(autofeature, token, cb) {
//   var payload = jwt.decode(token, process.env.JWT_SECRET);
//   var userid = payload._id; 
//   var newFeature = new Autofeature(autofeature); 
//   newFeature.ownerObj = userid; 
//   newFeature.save(function(err, savedFeature){
//     if (err) return cb(err);
//     cb(null, savedFeature); 
//   });
// };

autofeatureSchema.statics.add = function(autofeature, file, token, cb) {
  var filename = file.originalname;  
  var imageBuffer = file.buffer;
  var ext = filename.match(/\.\w+$/)[0] || '';
  var key = uuid.v1() + ext;// Guarantee a unique name. + ext to account for different types of files 
  
  console.log('key is: ', uuid.v1());


  var imageToUpload = {
    Bucket:process.env.AWS_BUCKET,
    Key:key, 
    Body:imageBuffer 
  };

  s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;

    console.log('AWSURL is: ', process.env.AWS_URL);
    console.log('AWS BUCKET is: ', process.env.AWS_BUCKET);

    var payload = jwt.decode(token, process.env.JWT_SECRET);
    var userid = payload._id; 
    var newAutofeature = new Autofeature(autofeature); 
    newAutofeature.ownerObj = userid; 
    newAutofeature.image.key = key; 
    newAutofeature.image.url = url; 
    newAutofeature.image.name = filename; 
    newAutofeature.save(function(err, savedAutofeature){
      if (err) return cb(err);
      console.log("Saved autofeature is: ", savedAutofeature);
      cb(null, savedAutofeature); 
    });
  }); // s3.putObject()
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