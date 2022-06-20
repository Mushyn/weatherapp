var express = require('express');
var router = express.Router();
var session = require('express-session');


var cityDataWeather = [
  {city:"London", weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:11, maxTemp:17},
  {city:"Athens", weather:"sunny", pictoUrl: '/images/picto-1.png', minTemp:21, maxTemp:27},
  {city:"Lisbon", weather:"rainy", pictoUrl: '/images/picto-1.png', minTemp:19, maxTemp:23},
  {city:"Madrid", weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:23, maxTemp:31},
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherApp' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'WeatherApp - Login' });
});

router.get('/weather', function(req, res, next) {
  console.log(cityDataWeather);
  res.render('weather', {cityDatas: cityDataWeather});
});

router.post('/addcity', function(req, res, next) {
  var myObj = {city:req.body.newCity, weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:11, maxTemp:17}
  let foundCity = false;
  for (let element in cityDataWeather){
    if ( element.city === req.body.newCity) {
      foundCity = true;
    }
  }
  if (foundCity !== true ) {
    cityDataWeather.push(myObj);
  }

  res.render('weather', {cityDatas: cityDataWeather});
});
module.exports = router;
