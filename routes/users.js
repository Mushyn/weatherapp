var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('sync-request');
var cityModel = require('../models/cities.js');
var userModel = require('../models/users.js');
var erreurMessage='';
//var userModel = require('../models/bdd.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  erreurMessage='';
  res.send('login', { title: 'WeatherApp', erreurMessage: erreurMessage });
});

router.post('/sign-up', async function(req, res, next) {
  /* Test de l'existence de l'utilisateur en base (recherche d'email) */
  var checkUser = await userModel.findOne({email: req.body.email});

  if(checkUser.email === req.body.email) {
    erreurMessage = "Cet adresse email est déjà utilisée!"
    res.render('login', { title: 'WeatherApp', erreurMessage: erreurMessage });
  } else {
    var newUser = new userModel ({
      userName: req.body.userName,
      email:  req.body.email,
      password: req.body.password
      });
      console.log('new user', newUser)
    var userSaved = await newUser.save();
    erreurMessage='';
    req.session.email =checkUser.email;
    req.session.id = checkUser.id;
    req.session.userName = checkUser.userName;
    res.redirect('/weather');
  }
});

router.post('/sign-in', async function(req, res, next) {
  /* Test de l'existence de l'utilisateur en base (recherche d'email) */
  var checkUser = await userModel.findOne({email: req.body.email});

  if(checkUser.password !== req.body.password) {
    erreurMessage = "Mot de passe incorrect !"
    res.render('login', { title: 'WeatherApp', erreurMessage: erreurMessage });
  } else {
    req.session.email =checkUser.email;
    req.session.id = checkUser._id;
    req.session.userName = checkUser.userName;
    res.redirect('/weather');
  }
});



module.exports = router;
