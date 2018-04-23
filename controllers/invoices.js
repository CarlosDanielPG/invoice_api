var mongoose = require('mongoose');
require('../models/invoice');
var Invoice = mongoose.model('Invoice');

//GET - Return all tvshows in the DB
exports.findAllInvoices = function(req, res) {
	Invoice.find(function(err, invoices) {
    if(err) res.send(500, err.message);

    console.log('GET /invoices')
		res.status(200).jsonp(invoices);
	});
};

exports.findById = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoices) {
    if(err) return res.send(500, err.message);

    console.log('GET /invoices/' + req.params.id);
		res.status(200).jsonp(invoices);
	});
};

//POST - Insert a new Invoice in the DB
exports.addInvoice = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var invoice = new Invoice({
		id_user:  req.body.id_user,
		params: {
      serie:  req.body.params.serie,
      folio:  req.body.params.folio,
      methodOfPayment:  req.body.params.methodOfPayment,
      termsOfPayment: req.body.params.termsOfPayment,
      discount: req.body.params.discount,
      discountReason: req.body.params.discountReason,
      exchargeRate: req.body.params.exchargeRate,
      currency: req.body.params.currency,
      typeOfVoucher: req.body.params.typeOfVoucher,
      expeditionPlace: req.body.params.expeditionPlace,
	      paymentAccountNumber: req.body.params.paymentAccountNumber
    },
    reciever: {
      rfc:  req.body.reciever.rfc,
      name: req.body.reciever.name,
      address: {
        street: req.body.reciever.address.street,
        municipality: req.body.reciever.address.municipality,
        state:  req.body.reciever.address.state,
        country:  req.body.reciever.address.country,
        postalCode: req.body.reciever.address.postalCode
      }
    },
    concepts: req.body.concepts,
		taxes: {
			retentions: req.body.taxes.retentions,
			transfers: req.body.taxes.transfers
		}
	});

	invoice.save(function(err, invoices) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(invoices);
	});
};

//Only in MongoDB or another no-sql database
//PUT - Update a invoice already exists
exports.updateInvoice = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
		invoice.params.serie    				= req.body.params.serie;
		invoice.params.folio						= req.body.params.folio;
		invoice.params.methodOfPayment	= req.body.params.methodOfPayment;
		invoice.params.termsOfPayment		= req.body.params.termsOfPayment;
		invoice.params.discount					= req.body.params.discount;
		invoice.params.discountReason		= req.body.params.discountReason;

		invoice.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(invoices);
		});
	});
};

//Only in MongoDB or another no-sql database
//DELETE - Delete a Invoice with specified ID
exports.deleteInvoice = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
		invoice.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      return res.status(200).send();
		})
	});
};
