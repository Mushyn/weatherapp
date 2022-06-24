var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('sync-request');
var cityModel = require('../models/cities.js');
var userModel = require('../models/users.js');
var erreur = false; //variable utilisé pour passer une information d'errreur 'ville non trouvée' au front.

router.get('/', async function(req, res, next) {
  
  console.log('test session', req.session);
  if(req.session.email){
    console.log('session active', req.session.userName);
    var cityDataWeather = await cityModel.find();
    res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
  } else {
    console.log('pas de session active');
    res.redirect('/login');
  }
});

/* ---- ajouter une ville  ---- */
router.post('/addcity', async function(req, res, next) {

  console.log('test session', req.session);
  if(req.session.email){
    console.log('session active', req.session.userName);
    var erreur = false;
    /* Verifie que le web service connait la ville */
    let myNewCity = openweatherCityInfo(req.body.newCity)
    //est-ce que la fonction web service a trouvé la ville recherchée ?
    if (myNewCity.message !== 'city not found') {
      //Est-ce que la ville est déjà dans la base ?
      var checkNewCity = await cityModel.findOne({city: myNewCity.city});
      console.log('checknewcity',checkNewCity);
      if (checkNewCity) {
        res.redirect('/weather');
      } else {
        // la ville n'est pas dans la base
        console.log ('hello false !!!')
        var addCity =new cityModel({
          city: myNewCity.city,
          pictoUrl: myNewCity.pictoUrl,
          weather: myNewCity.weather,
          minTemp: myNewCity.minTemp,
          maxTemp: myNewCity.maxTemp,
          lng:myNewCity.lng,
          lat:myNewCity.lat,
          }
        );
        await addCity.save()
      }
    } else {
      // la ville n'existe pas
      erreur = true;
    }
  
    var cityDataWeather = await cityModel.find();
    res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
  } else {
    console.log('pas de session active');
    res.redirect('/login');
  }
});





/* supprimer une ville en utilisant le cityName */
router.get('/deletecity', async function(req, res, next) {
  
  console.log('test session', req.session);
  if(req.session.email){
    console.log('session active', req.session.userName);
    var deletecity = await cityModel.deleteOne({ city: req.query.cityName});
    var cityDataWeather = await cityModel.find();
    erreur = false;
    res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
  } else {
    console.log('pas de session active');
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res, next) {
  
  req.session=null;

  res.redirect('/login');
});

/*mettre à jour l'ensembel des données météo des villes suivies */
router.get('/updateweather', async function(req, res, next) {

  console.log('test session', req.session);
  if(req.session.email){
    console.log('session active', req.session.userName);
    var cityDataWeather = await cityModel.find();
    for (i=0; i<1;i++) {
      console.log('ma source:', cityDataWeather[i]);
      let newWeatherData = openweatherCityInfo(cityDataWeather[i].city);
      console.log('mon update:',newWeatherData);
      
      var updatecities = await cityModel.updateOne(
        {city:cityDataWeather[i].city},
        {
          weather: newWeatherData.weather,
          pictoUrl:newWeatherData.pictoUrl,
          minTemp: newWeatherData.minTemp,
          maxTemp:newWeatherData.maxTemp,
          lng:newWeatherData.lng,
          lat:newWeatherData.lat,
        }
      )
    }
    erreur = false;
    var cityDataWeather = await cityModel.find();
    res.render('weather', {cityDatas: cityDataWeather, erreur:erreur});
  } else {
    console.log('pas de session active');
    res.redirect('/login');
  }
});



/*fonction retournant un objet avec les informations de city mises à jour depuis le web services */
/*Renvoie un objet avec l'ensembles des informations de la ville et une message (vide ou 'city not found')*/
const openweatherCityInfo = (cityName) => {
  var element ={};
  var requete = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2ea9fc9094080a68c1b561115e028016&lang=fr&units=metric`)
  var result = JSON.parse(requete.body);
  console.log(result);
  if (result.message !=="city not found") {
    element.city = result.name
    element.pictoUrl = `owf owf-${result.weather[0].id}`;
    element.weather = result.weather[0].description;
    element.minTemp = result.main.temp_min;
    element.maxTemp = result.main.temp_max;
    element.lng = result.coord.lon,
    element.lat =  result.coord.lat,
    element.message = ''
    
    return element;
  } else {
    element.message = 'city not found';
    return element;
  }  

}

module.exports = router;
