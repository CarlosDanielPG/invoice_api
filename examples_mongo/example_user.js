var express  = require("express"),
    bodyParser = require('body-parser'),
    app      = express(),
    http     = require("http"),
    methodOverride = require('method-override'),
    server   = http.createServer(app),
    mongoose = require('mongoose');

var urlDB = 'mongodb://127.0.0.1:27017/prueba';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

mongoose.connect(urlDB, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  console.log('Conected');
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
