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
  image:{
    data:{type:Buffer},
    contentType:{type:String},
    url:{type:String}
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
  console.log('JWT DECODED: \n', payload);
  var userid = payload._id; 
  Item.find({ownerObj: userid}, function(err, items) {
    console.log("Items, \n \n", items);
    if (err) return cb(err);
    cb(null, items); 
  })
};

itemSchema.statics.add = function(item, cb) {
  // Set image item here
  var imgURL = '/Users/georgewee/Downloads/1-3QvdESc0T4lPkrQj-uVyXQ.jpg';
  fs.readFile(imgURL, function(err, data){
    console.log('data is: ', data);

    var newItem = new Item(item); 
    newItem.image.data = data; 
    newItem.image.contentType = 'image/png'; 
    newItem.save(function(err, savedItem){
      console.log('saved item is: ', savedItem);
      if (err) return cb(err);
      cb(null, savedItem); 
    });
  });

    
};

itemSchema.statics.image = function(item) {
}

Item = mongoose.model('Item', itemSchema);
module.exports = Item;