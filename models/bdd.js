var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Olivier:Innowie17Kendo87%26%21Atlas@cluster0.ogneg.mongodb.net/weatherapp?retryWrites=true&w=majority',
     /* options,        
      function(err) {
       console.log(err);
      }*/
   );

var citySchema = mongoose.Schema({
    city : String,
    weather: String,
    pictoUrl: String,
    minTemp: Number,
    maxTemp: Number,
});

var cityModel = mongoose.model('cities', citySchema);

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

var userModel = mongoose.model('users', userSchema);

module.exports = {cityModel, userModel};
