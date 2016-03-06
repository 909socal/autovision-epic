'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var User = require('../models/user'); 

var authMiddleware = function(req, res, next) {
  // console.log('REQ.COOKIES', req.cookies);
  try {
    // console.log("JWT_SECRET", JWT_SECRET);
    var payload = jwt.decode(req.cookies, JWT_SECRET);
    console.log('PAYLOAD!!!', payload);
  } catch(err) {
    console.log("ERRRR",err);
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
