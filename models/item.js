'use strict';
require('dotenv').config(); // Loads environment variables 
var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');

var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var uuid = require('node-uuid');
var multer = require('multer');
var async = require('async');

var Item; 

var itemSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:String},
  description:{type:String},
  category:{type:String},
  price:{type:Number},
  // image:{type:Buffer},
  image:{
    key:{type:String},
    url:{type:String},
    name:{type:String}
  },
  contactinfo:{
    zip:{type:Number},
    email:{type:String},
    phone:{type:String}
  },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

// itemSchema.statics.getUserItems = function(userid, cb) {
//   Item.find({ownerObj: userid}, function(err, items) {
//     if (err) return cb(err);
//     cb(null, items); 
//   })
// };

itemSchema.statics.getUserItems = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  Item.find({ownerObj: userid}, function(err, items) {
    //console.log("Items, \n \n", items);
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, file, token, cb) {
  /*
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  var userid = payload._id; 
  var newItem = new Item(item); 
  newItem.ownerObj = userid; 

  newItem.save(function(err, savedItem){
    if (err) return cb(err);
    cb(null, savedItem); 
  });
  */
  var filename = file.originalname;  
  var imageBuffer = file.buffer;
  // $ : last , + : one or more
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
    var newItem = new Item(item); 
    newItem.ownerObj = userid; 
    // var imageObj = {
    //   key:key, 
    //   url:url, 
    //   name:filename; 
    // }
    // var image = new Image(imageObj);
    // newItem.images.push(image);
    newItem.image.key = key; 
    newItem.image.url = url; 
    newItem.image.name = filename; 
    newItem.save(function(err, savedItem){
      if (err) return cb(err);
      console.log("Saved item is: ", savedItem);
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

itemSchema.statics.image = function(item) {
}

Item = mongoose.model('Item', itemSchema);
module.exports = Item;