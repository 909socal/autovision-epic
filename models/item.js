'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
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

itemSchema.statics.getUserItems = function(userid, cb) {
  Item.find({ownerObj: userid}, function(err, items) {
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, cb) {
  // Set image item here

  var newItem = new Item(item); 
  newItem.save(function(err, savedItem){
    if (err) return cb(err);
    cb(null, savedItem); 
  });
};

itemSchema.statics.image = function(item) {
}

Item = mongoose.model('Item', itemSchema);
module.exports = Item;