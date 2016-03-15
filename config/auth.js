'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var authMiddleware = function(req, res, next) {
  try {
    var payload = jwt.decode(req.cookies, JWT_SECRET);
    console.log('Payload:', payload);
  } catch(err) {
    console.log("err:",err);
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
