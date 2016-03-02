'use strict';

var mongoose = require('mongoose');

var Item; 

var itemSchema = new mongoose.Schema({
  make: {type:String}, 
  model: {type:String}, 
  year:{type:Date},
  description: {type:String},
  category: {type:String},
  image: {type:Buffer},
  contactinfo:{
    zip: {type:Number},
    email: {type:String},
    phone: {type:String}
  },
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

itemSchema.statics.getAll = function(item, cb) {
  Item.find({}, function(err, items) {
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.getUserItems = function(userid, cb) {
  Item.find({ownerObj: userid}, function(err, items) {
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, cb) {
  var newItem = new Item(item); 
  item.save(function(err, savedItem){
    if (err) return cb(err);
    cb(null, savedItem); 
  });
};



Item = mongoose.model('Item', itemSchema);
module.exports = Item;