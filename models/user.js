// 'use strict';

// var mongoose = require('mongoose');
// var jwt = require('jwt-simple');

// var JWT_SECRET = process.env.JWT_SECRET;

// var User;

// var userSchema = mongoose.Schema({
//   email: { type: String },
//   password: { type: String },
//   username: { type: String }
  
// });


// userSchema.statics.register = function (userObj, cb) {
//   if(!userObj.email || !userObj.password){
//     return cb("Missing required field (email, password)");
//   }
//   ref.createUser(userObj, function(err, userData) {
//     if(err) return cb(err);
//     User.create({
//       uid: userData.uid,
//       email: userObj.email,
//       firstname: userObj.firstname || '', 
//       lastname: userObj.lastname || '',
//       phone: userObj.phone || ''
//     }, cb);
//   });
// };

// userSchema.statics.login = function(userObj, cb) {
//   if(!userObj.email || !userObj.password){
//     return cb("Missing required field (email, password)");
//   }
//   ref.authWithPassword(userObj, function(err, authData) {
//     if(err) return cb(err);
//     User.findOne({uid: authData.uid}, function(err, user) {
//       if(err || !user) return cb(err || 'User not found in db.');
//       var token = user.generateToken();
//       cb(null, user, token);
//     });
//   });
// };

// userSchema.methods.generateToken = function() {
//   var payload = {
//     uid: this.uid,
//     _id: this._id, 
//     email: this.email
//   };
//   var token = jwt.encode(payload, JWT_SECRET); 
//   console.log("HERE'S THE TOKEN", token);
//   return token;
// }



// User = mongoose.model('User', userSchema);

// module.exports = User;




// 'use strict';

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
// var jwt = require('jwt-simple');

// var User;

// var userSchema = Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: String,
//   age: Number,
//   eye: String,
//   hair: String,
//   gender: String,
//   pp: String,
//   interested: String,
//   alcohol: String,
//   smoker: Boolean,
//   winks: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
// });

// userSchema.methods.token = function() {
//   var payload = {
//     email: this.email,
//     _id: this._id
//   };
//   var secret = process.env.JWT_SECRET;
//   var token = jwt.encode(payload, secret);
//   return token;
// };

// userSchema.statics.register = function(user, cb) {
//   var email = user.email;
//   var password = user.password;
//   User.findOne({email: email}, function(err, user){
//     if(err || user) return cb(err || 'email already taken.');
//     bcrypt.genSalt(10, function(err1, salt) {
//       bcrypt.hash(password, salt, function(err2, hash) {
//         if(err1 || err2) return cb(err1 || err2);
//         var newUser = new User();
//         newUser.email = email;
//         newUser.password = hash;
//         newUser.save(function(err, savedUser){
//           savedUser.password = null;
//           cb(err, savedUser);
//         });
//       });
//     });
//   });
// };

// userSchema.statics.authenticate = function(inputUser, cb){
//   User.findOne({email: inputUser.email}, function(err, dbUser) {
//     if(err || !dbUser) return cb(err || 'Incorrect email or password.');
//     bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
//       if(err || !isGood) return cb(err || 'Incorrect email or password.');
//       dbUser.password = null;
//       cb(null, dbUser);
//     });
//   });
// };

// User = mongoose.model('User', userSchema);
// module.exports = User;

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-node');
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.token = function() {
  var payload = {
    email: this.email,
    _id: this._id
  };
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
};

userSchema.statics.register = function(user, cb) {
  console.log("register user", user);
  var email = user.email;
  var password = user.password;
  User.findOne({email: email}, function(err, user){
    console.log("ALL GOOD?", user);
    if(err || user) return cb(err || 'email already taken.');
    bcrypt.genSalt(10, function(err1, salt) {
      console.log('gensalt', err1, salt);
      console.log('password:', password);
      // bcrypt.hash("bacon", null, null, function(err, hash) {
      //   console.log(hash, 'sya soemthing too');
      // })
      bcrypt.hash(password, salt, null, function(err2, hash) {
        console.log('hash', err2, hash);
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.email = email;
        newUser.password = hash;
        console.log('newuser', newUser);
        newUser.save(function(err, savedUser){
          console.log('savedUser', savedUser);
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(inputUser, cb){
  console.log('authenticate', inputUser);

  User.findOne({email: inputUser.email}, function(err, dbUser) {
    console.log('User.findOne', err, dbUser);
    if(err || !dbUser) return cb(err || 'Incorrect email or password.');
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
      console.log('compare', err, isGood);
      if(err || !isGood) return cb(err || 'Incorrect email or password.');
      dbUser.password = null;
      console.log('successful login', dbUser);
      cb(null, dbUser);
    });
  });
};

userSchema.statics.isAuthenticated = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Authentication required.');
  }
  var auth = req.headers.authorization.split(' ');
  if (auth[0] !== 'Bearer') {
    return res.status(401).send('Authentication required.');
  }
  var token = auth[1];
  try {
    var payload = jwt.decode(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send('Authentication failed.  Invalid token.');
  }
  if(moment().isAfter(moment.unix(payload.exp))) {
    return res.status(401).send('Authentication failed.  Token expired.');
  }
  var userId = payload._id;
  User.findById(userId, function (err, user) {
    if (err || !user) return res.status(401).send(err || 'Authentication failed.  User not found.');
    user.password = null;
    req.user = user;
    next();
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;