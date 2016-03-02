'use strict';

var mongoose = require('mongoose');

var Autofeature; 

var autofeatureSchema = new mongoose.Schema({
  make: {type:String}, 
  model: {type:String}, 
  year:{type:Date},
  description:{type:String},
  category:{type:String},
  image:{type:Buffer},
  contactinfo:{
    zip: {type:Number},
    email: {type:String},
    phone: {type:String}
  }
  createdAt:{type:Date, default:Date.now},
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  available:{type:Boolean, default:true}
});

Autofeature = mongoose.model('Autofeature', autofeatureSchema);

module.exports = Autofeature;