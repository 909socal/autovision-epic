'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var User = require('../models/user'); 

var authMiddleware = function(req, res, next) {
  console.log('REQ.COOKIES', req.cookies);
  //console.log('REQ.COOKIES', req.cookies.refresh_token);
  console.log('key:', req.cookies.token)
  try {
    console.log("JWT_SECRET", JWT_SECRET);
    var payload = jwt.decode(req.cookies, JWT_SECRET);
    console.log(payload);
  } catch(err) {
    console.log("ERRRR",err);
    // return res.status(401).send('Authentication failed.');
    // return res.status(401).render('noauth');
  }

  req.user = payload;
  console.log('PAYLOAD!!!', payload);
  next();
};

// var authMiddleware = function(req, res, next) {
//   // if (!req.headers.authorization) {
//   //   return res.status(401).send('Authentication required.');
//   // }
//   var auth = req.headers.authorization.split(' ');
//   // if (auth[0] !== 'Bearer') {
//   //   return res.status(401).send('Authentication required.');
//   // }
//   var token = auth[1];
//   try {
//     var payload = jwt.decode(token, JWT_SECRET);
//   } catch (err) {
//     return res.status(401).send('Authentication failed.  Invalid token.');
//   }
//   // if(moment().isAfter(moment.unix(payload.exp))) {
//   //   return res.status(401).send('Authentication failed.  Token expired.');
//   // }
//   var userId = payload._id;
//   User.findById(userId, function (err, user) {
//     if (err || !user) return res.status(401).send(err || 'Authentication failed.  User not found.');
//     user.password = null;
//     req.user = user;
//     next();
//   });
// };

module.exports = authMiddleware;
