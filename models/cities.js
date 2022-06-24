var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    city : String,
    weather: String,
    pictoUrl: String,
    minTemp: Number,
    maxTemp: Number,
    lng: String,
    lat: String,
});

var cityModel = mongoose.model('cities', citySchema);


module.exports = cityModel;