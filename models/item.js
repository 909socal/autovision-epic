'use strict';
require('dotenv').config(); // Loads environment variables 
var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');

var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var uuid = require('node-uuid');
var multer = require('multer');

var Item; 

var itemSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:String},
  description:{type:String},
  category:{type:String},
  price:{type:Number},
  zip:{type:Number},
  image:{
    key:{type:String},
    url:{type:String},
    name:{type:String}
  },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

itemSchema.statics.getUserItems = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  Item.find({ownerObj: userid}, function(err, items) {
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, file, token, cb) {
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

    var payload = jwt.decode(token, process.env.JWT_SECRET);
    var userid = payload._id; 
    var newItem = new Item(item); 
    newItem.ownerObj = userid; 
    newItem.image.key = key; 
    newItem.image.url = url; 
    newItem.image.name = filename; 
    newItem.save(function(err, savedItem){
      if (err) return cb(err);
      
      cb(null, savedItem); 
    });
  }); // s3.putObject()
};

itemSchema.statics.edit = function(itemObj, itemId, cb) {
  Item.findById(itemId, function(err, item){
    if(err) return res.status(400).send(err); 
    item._id = itemObj._id; 
    item.make = itemObj.make; 
    item.model = itemObj.model; 
    item.year = itemObj.year; 
    item.description = itemObj.description; 
    item.zip = itemObj.zip; 
    item.price = itemObj.price; 
    item.category = itemObj.category; 
    if (itemObj.contactinfo) {
      item.contactinfo.email = itemObj.contactinfo.email;
      item.contactinfo.phone = itemObj.contactinfo.phone;
      item.contactinfo.zip = itemObj.contactinfo.zip;
    };
    item.save(function(err, savedItem){
      if (err) return cb(err);
      cb(null, savedItem); 
    })
  });
}

Item = mongoose.model('Item', itemSchema);
module.exports = Item;