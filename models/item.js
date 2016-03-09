'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jwt-simple');
var Item; 

var itemSchema = new mongoose.Schema({
  make:{type:String}, 
  model:{type:String}, 
  year:{type:String},
  description:{type:String},
  category:{type:String},
  price:{type:Number},
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

// itemSchema.statics.getUserItems = function(userid, cb) {
//   Item.find({ownerObj: userid}, function(err, items) {
//     if (err) return cb(err);
//     cb(null, items); 
//   })
// };

itemSchema.statics.getUserItems = function(token, cb) {
  var payload = jwt.decode(token, process.env.JWT_SECRET);
  console.log('JWT DECODED: \n', payload);
  var userid = payload._id; 
  Item.find({ownerObj: userid}, function(err, items) {
    console.log("Items, \n \n", items);
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, token, cb) {
    var payload = jwt.decode(token, process.env.JWT_SECRET);
    console.log('JWT DECODED: \n', payload);
    var userid = payload._id; 
    var newItem = new Item(item); 
    newItem.ownerObj = userid; 
    newItem.save(function(err, savedItem){
      console.log('saved item is: ', savedItem);
      if (err) return cb(err);
      cb(null, savedItem); 
    });
};

itemSchema.statics.image = function(item) {
}

Item = mongoose.model('Item', itemSchema);
module.exports = Item;