var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Olivier:Innowie17Kendo87%26%21Atlas@cluster0.ogneg.mongodb.net/weatherapp?retryWrites=true&w=majority',
     options,        
      function(err) {
       console.log(err);
      }
   );
