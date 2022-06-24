var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('sync-request');
var cityModel = require('../models/cities.js');
var userModel = require('../models/users.js');
var erreurMessage='';
var erreur = false;


/* GET home page. */
router.get('/', function(req, res, next) {
  var erreurMessage='';
  res.render('login', { title: 'WeatherApp', erreurMessage: erreurMessage });
});

router.get('/login', function(req, res, next) {
  var erreurMessage='';
  res.render('login', { title: 'WeatherApp - Login', erreurMessage: erreurMessage });
});

module.exports = router;
