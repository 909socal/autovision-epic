'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');
var jwt = require('jwt-simple');
var uuid = require('node-uuid');
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

var Schema = mongoose.Schema;
var User;

var userSchema = Schema({
  email:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }
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
  var email = user.email;
  var password = user.password;
  User.findOne({email: email}, function(err, user){
    if(err || user) return cb(err || 'email already taken.');
    bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(password, salt, null, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.email = email;
        newUser.password = hash;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(inputUser, cb){
  User.findOne({email: inputUser.email}, function(err, dbUser) {
    if(err || !dbUser) return cb(err || 'Incorrect email or password.');
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
      if(err || !isGood) return cb(err || 'Incorrect email or password.');
      dbUser.password = null;
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

userSchema.statics.reset= function(inputUser, cb){
  var email = inputUser.user;
  var password = inputUser.newPassword;
  User.findOne({email: email}, function(err, user){
    if(err) return cb(err);
    bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(password, salt, null, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        user.password = hash;
        user.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

userSchema.statics.forgotPassword = function(userEmail, cb) {
  User.findOne({email:userEmail}, function(err, user){
    if(err) return cb(err);
    var temporaryPassword = uuid.v1();

    bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(temporaryPassword, salt, null, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        user.password = hash;
        user.save(function(err, savedUser){
          savedUser.password = null;

          var data = {
            from: 'Autovision <mdeggies@sandbox19714487a4e84db7abe48144d77098b7.mailgun.org>', //sent from here
            to: userEmail,
            subject: 'Password Reset from Autovision',
            text: 'Here is your temporary password: ' + temporaryPassword + ' Please login with your username and temporary password. You may reset password in your account. https://autovision.herokuapp.com/#/'
          };

          mailgun.messages().send(data, function (error, body) {          
            cb(err, savedUser);
          });
        });
      });
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
