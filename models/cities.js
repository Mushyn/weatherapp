var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    city : String,
    weather: String,
    pictoUrl: String,
    minTemp: Number,
    maxTemp: Number,
});

var cityModel = mongoose.model('cities', citySchema);


module.exports = cityModel;