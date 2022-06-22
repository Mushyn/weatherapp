var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('sync-request');

var erreur = false;
var cityDataWeather = [
  {city:"London", weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:11, maxTemp:17},
  {city:"Athens", weather:"sunny", pictoUrl: '/images/picto-1.png', minTemp:21, maxTemp:27},
  {city:"Lisbon", weather:"rainy", pictoUrl: '/images/picto-1.png', minTemp:19, maxTemp:23},
  {city:"Madrid", weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:23, maxTemp:31},
]

const updateCityWeather = () => {
  for (let element of cityDataWeather){
    var city = element.city
    console.log(city);
    var requete = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea9fc9094080a68c1b561115e028016&lang=fr&units=metric`)
    var result = JSON.parse(requete.body);
    console.log(result);
    //if (element.city!==result.name) {element.city=result.name; console.log(element.city);};
    element.pictoUrl = `owf owf-${result.weather[0].id}`;
    element.weather = result.weather[0].description;
    element.minTemp = result.main.temp_min;
    element.maxTemp = result.main.temp_max;
    console.log(element.city);
  }
};

const checkCity = (city) => {
  var requete = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea9fc9094080a68c1b561115e028016&lang=fr&units=metric`)
  var result = JSON.parse(requete.body);
  console.log('check city:', result);
  if (result.cod === "404") {
    return false;
  } else {
    return true;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherApp' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'WeatherApp - Login' });
});

router.get('/weather', function(req, res, next) {
  erreur=false;
  updateCityWeather();
  /*console.log(cityDataWeather);*/
  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

router.post('/addcity', function(req, res, next) {

  if (checkCity(req.body.newCity)){
    var myObj = {city:req.body.newCity, weather:"cloudy", pictoUrl: '/images/picto-1.png', minTemp:11, maxTemp:17}
    let foundCity = false;
    for (let element of cityDataWeather){
      console.log(element.city);
      if ( element.city === myObj.city) {
        foundCity = true;
      }
    }
    if (foundCity !== true ) {
      cityDataWeather.push(myObj);
      console.log('ajout ville : ',cityDataWeather);
      updateCityWeather();
      erreur=false;
    }
  } else {
    erreur=true;
  }
  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

router.get('/deletecity', function(req, res, next) {
  cityDataWeather.splice(req.query.cityNumber,1);
  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

module.exports = router;
