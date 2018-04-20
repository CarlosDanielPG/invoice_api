var mongoose = require('mongoose');

var urlDB = 'mongodb://127.0.0.1:27017/prueba';

mongoose.connect(urlDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});
