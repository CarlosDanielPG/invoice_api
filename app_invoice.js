var express  = require("express"),
    bodyParser = require('body-parser'),
    app      = express(),
    http     = require("http"),
    methodOverride = require('method-override'),
    server   = http.createServer(app),
    mongoose = require('mongoose');


var urlDB = 'mongodb://127.0.0.1:27017/invoices';
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

var InvoiceController = require('./controllers/invoices');

// API routes
var invoices = express.Router();

invoices.route('/invoices')
  .get(InvoiceController.findAllInvoices)
  .post(InvoiceController.addInvoice);

invoices.route('/invoices/:id')
  .get(InvoiceController.findById)
  .put(InvoiceController.updateInvoice)
  .delete(InvoiceController.deleteInvoice);

invoices.route('/invoices/user/:id_user')
  .get(InvoiceController.findInvoicesByUser);

invoices.route('/invoices/stamp')
  .post(InvoiceController.stampInvoice);

invoices.route('/invoices/stamp/:id')
  .post(InvoiceController.stampInvoiceById);

app.use('/api', invoices);
