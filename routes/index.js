var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherApp' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'WeatherApp - Login' });
});

router.get('/weather', function(req, res, next) {
  res.render('weather', { title: 'WeatherApp' });
});


module.exports = router;
