'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');

var Autofeature; 

var autofeatureSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:Date},
  description:{type:String},
  category:{type:String},
  image:{type:Buffer},
  contactinfo:{
    zip:{type:Number},
    email:{type:String},
    phone:{type:String}
  },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

autofeatureSchema.statics.getUserAutofeatures = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  Autofeature.find({ownerObj: userid}, function(err, features) {
    if (err) return cb(err);
    cb(null, features); 
  })
};

autofeatureSchema.statics.add = function(feature, token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  var newFeature = new Autofeature(feature); 
  newFeature.ownerObj = userid; 
  newFeature.save(function(err, savedFeature){
    if (err) return cb(err);
    cb(null, savedFeature); 
  });
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