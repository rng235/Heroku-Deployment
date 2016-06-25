var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

//Schemas
var EPoem = mongoose.model('EPoem');
var userPoem = mongoose.model('userPoem');
var User = mongoose.model('User');
var userList = mongoose.model('userList');

//lightweight HTTP request library
var unirest = require('unirest');

var router = express.Router();

//Used to replace line breaks in user input
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

//-------------------------Home Page|Poems-------------------------
router.get('/', function (req, res) {
    res.render('home');
});


module.exports = router;
