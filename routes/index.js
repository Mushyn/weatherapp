var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('sync-request');
var cityModel = require('../models/bdd');

var erreur = false;


const updateCityWeather = (cityName) => {
    var element = {};
    var requete = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=2ea9fc9094080a68c1b561115e028016&lang=fr&units=metric`)
    var result = JSON.parse(requete.body);
    console.log(result);
    if (result.length > 0) {
    element.city = result.name
    element.pictoUrl = `owf owf-${result.weather[0].id}`;
    element.weather = result.weather[0].description;
    element.minTemp = result.main.temp_min;
    element.maxTemp = result.main.temp_max;
    }
    return element;
  };

const checkCityExist = (city) => {
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

router.get('/weather', async function(req, res, next) {
  
  var cityDataWeather = await cityModel.find();

  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

router.post('/addcity', async function(req, res, next) {
  var erreur = false;
  var foundCity = false;
  var myObj = {city:req.body.newCity};

  /* Verifie que le web service connait la ville */
  if (checkCityExist(req.body.newCity)){
    /* ville connue du WS*/

    /* recherche de l'existance de la ville dans la BDD */
    var NewcityDataWeather = await cityModel.find({city: myObj.city});
    console.log(NewcityDataWeather);
    if ( NewcityDataWeather !== null) {
      foundCity = true;
    }
    }
    if (foundCity === false ) {
      myObj = updateCityWeather(myObj.city);
      
      var cityDataWeather =new cityModel(
        {city: myObj.city,
        pictoUrl: myObj.pictoUrl,
        weather: myObj.weather,
        minTemp: myObj.minTemp,
        maxTemp: myObj.maxTemp}
        );
      var citySave = await cityDataWeather.save()

      console.log('ajout ville : ',cityDataWeather);

      erreur=false;
    
      } else {
      erreur=true;
      }
    
  var cityDataWeather = await cityModel.find();

  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

router.get('/deletecity', async function(req, res, next) {
  
  var deletecity = await cityModel.deleteOne({ city: req.query.cityName});
  var cityDataWeather = await cityModel.find();
  erreur = false;

  res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
});

module.exports = router;
