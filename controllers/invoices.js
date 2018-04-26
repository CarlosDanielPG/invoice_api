const { check, validationResult } = require('express-validator/check');
const admin = require('firebase-admin');
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

var axios = require('axios');
var mongoose = require('mongoose');
require('../models/invoice');
var Invoice = mongoose.model('Invoice');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

var db = admin.firestore();

//GET - Return all tvshows in the DB
exports.findAllInvoices = function(req, res) {
	Invoice.find(function(err, invoices) {
    if(err) res.send(500, err.message);

    console.log('GET /invoices')
		res.status(200).jsonp(invoices);
	});
};

exports.findInvoicesByUser = function(req, res){
	console.log(req.params.id_user);
	Invoice.find({"id_user" : req.params.id_user}, function(err, invoices){
		if(err) res.send(500, err.message);

    console.log('GET /invoices/user');
		if(invoices.length == 0)
			console.log('No invoices for this user');
		res.status(200).jsonp(invoices);
	});
}

exports.findById = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
    if(err) return res.send(500, err.message);
    console.log('GET /invoices/' + req.params.id);
		res.status(200).jsonp(invoice);
	});
};

//POST - Insert a new Invoice in the DB
exports.addInvoice = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var invoice = new Invoice({
		id_user:  req.body.id_user,
		status: req.body.status,
		invoice:{
			params: {
	      serie:  req.body.invoice.params.serie,
	      folio:  req.body.invoice.params.folio,
	      paymentMethod: req.body.invoice.params.paymentMethod,
	      termsOfPayment: req.body.invoice.params.termsOfPayment,
	      discount: req.body.invoice.params.discount,
	      discountReason: req.body.invoice.params.discountReason,
	      exchargeRate: req.body.invoice.params.exchargeRate,
	      currency: req.body.invoice.params.currency,
	      typeOfVoucher: req.body.invoice.params.typeOfVoucher,
				methodOfPayment:  req.body.invoice.params.methodOfPayment,
	      expeditionPlace: req.body.invoice.params.expeditionPlace,
	      paymentAccountNumber: req.body.invoice.params.paymentAccountNumber
	    },
	    reciever: {
	      rfc:  req.body.invoice.reciever.rfc,
	      name: req.body.invoice.reciever.name,
	      address: {
	        street: req.body.invoice.reciever.address.street,
	        municipality: req.body.invoice.reciever.address.municipality,
	        state:  req.body.invoice.reciever.address.state,
	        country:  req.body.invoice.reciever.address.country,
	        postalCode: req.body.invoice.reciever.address.postalCode
	      }
	    },
	    concepts: req.body.invoice.concepts,
			taxes: {
				retentions: req.body.invoice.taxes.retentions,
				transfers: req.body.invoice.taxes.transfers
			}
		}
	});

	invoice.save(function(err, invoice) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(invoice._id);
		console.log(invoice._id);
	});
};

//Only in MongoDB or another no-sql database
//PUT - Update a invoice already exists
exports.updateInvoice = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
		if(invoice.status == 'Sealed')
			return res.status(401).send('Invoice already sealed');
		invoice.status																= req.body.status;
		invoice.invoice.params.serie    							= req.body.invoice.params.serie;
		invoice.invoice.params.folio									= req.body.invoice.params.folio;
		invoice.invoice.params.methodOfPayment				= req.body.invoice.params.methodOfPayment;
		invoice.invoice.params.termsOfPayment					= req.body.invoice.params.termsOfPayment;
		invoice.invoice.params.discount								= req.body.invoice.params.discount;
		invoice.invoice.params.discountReason					= req.body.invoice.params.discountReason;
		invoice.invoice.params.exchargeRate						= req.body.invoice.params.exchargeRate;
		invoice.invoice.params.currency								= req.body.invoice.params.currency;
		invoice.invoice.params.typeOfVoucher					= req.body.invoice.params.typeOfVoucher;
		invoice.invoice.params.expeditionPlace				= req.body.invoice.params.expeditionPlace;
		invoice.invoice.params.paymentAccountNumber		= req.body.invoice.params.paymentAccountNumber;
		invoice.invoice.reciever.rfc									= req.body.invoice.reciever.rfc;
		invoice.invoice.reciever.name									= req.body.invoice.reciever.name;
		invoice.invoice.reciever.address.street				= req.body.invoice.reciever.address.street;
		invoice.invoice.reciever.address.municipality	= req.body.invoice.reciever.address.municipality;
		invoice.invoice.reciever.address.state				= req.body.invoice.reciever.address.state;
		invoice.invoice.reciever.address.country			= req.body.invoice.reciever.address.country;
		invoice.invoice.reciever.address.postalCode		= req.body.invoice.reciever.address.postalCode;
		invoice.invoice.concepts 											= req.body.invoice.concepts;
		invoice.invoice.taxes.retentions							= req.body.invoice.taxes.retentions;
		invoice.invoice.taxes.transfers								= req.body.invoice.taxes.transfers;
		invoice.unix_timestamp												= Date.now();

		invoice.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(invoice._id);
		});
	});
};

//Only in MongoDB or another no-sql database
//DELETE - Delete a Invoice with specified ID
exports.deleteInvoice = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
		if(!invoice)
			return res.status(404).send('Not found invoice');
		if(invoice.status == 'Sealed')
			return res.status(401).send('Invoice sealed');
		invoice.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			console.log('DELETE /invoices/');
      return res.status(200).send();
		});
	});
};

exports.stampInvoiceById = function(req, res) {
	Invoice.findById(req.params.id, function(err, invoice) {
		if(!invoice)
			return res.status(404).send('Not found invoice');
		console.log('POST');
		updateInvoice(req, invoice, res);
	});
}

exports.stampInvoice = function(req, res) {
	console.log('POST');
	var invoice = new Invoice({
		id_user:  req.body.id_user,
		status: req.body.status,
		invoice:{
			params: {
	      serie:  req.body.invoice.params.serie,
	      folio:  req.body.invoice.params.folio,
	      paymentMethod: req.body.invoice.params.paymentMethod,
	      termsOfPayment: req.body.invoice.params.termsOfPayment,
	      discount: req.body.invoice.params.discount,
	      discountReason: req.body.invoice.params.discountReason,
	      exchargeRate: req.body.invoice.params.exchargeRate,
	      currency: req.body.invoice.params.currency,
	      typeOfVoucher: req.body.invoice.params.typeOfVoucher,
				methodOfPayment:  req.body.invoice.params.methodOfPayment,
	      expeditionPlace: req.body.invoice.params.expeditionPlace,
	      paymentAccountNumber: req.body.invoice.params.paymentAccountNumber
	    },
	    reciever: {
	      rfc:  req.body.invoice.reciever.rfc,
	      name: req.body.invoice.reciever.name,
	      address: {
	        street: req.body.invoice.reciever.address.street,
	        municipality: req.body.invoice.reciever.address.municipality,
	        state:  req.body.invoice.reciever.address.state,
	        country:  req.body.invoice.reciever.address.country,
	        postalCode: req.body.invoice.reciever.address.postalCode
	      }
	    },
	    concepts: req.body.invoice.concepts,
			taxes: {
				retentions: req.body.invoice.taxes.retentions,
				transfers: req.body.invoice.taxes.transfers
			}
		}
	});

	invoice.save(function(err, invoice) {
		if(err) return res.status(500).send( err.message);
		updateInvoice(req, invoice, res);
	});
}

function updateInvoice(req, invoice, res) {


	var usersRef = db.collection('users');
	user = usersRef.doc(req.body.id_user)
	user.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!');
					return res.status(500).send("Not user registered in Firebase");
				}
				var regime = [];
				regime.push({regime: doc.data().sat[0].regime});
				//Add emisor data
				invoice.invoice.issuer.name			= doc.data().display_name;
				invoice.invoice.issuer.rfc			= doc.data().sat[0].rfc;
				invoice.invoice.issuer.address	= doc.data().sat[0].address;
				//if(req.body.invoice.issuer.issuedIn.length == 0)
					invoice.invoice.issuer.issuedIn = doc.data().sat[0].address;
				//else
					//invoice.invoice.issuer.issuedIn = req.body.invoice.issuer.issuedIn;
				invoice.invoice.issuer.regime = regime;
				invoice.unix_timestamp 	= Date.now();
				paybook_user = doc.data().paybook_user;
				invoice.save(function(err, invoice){
					if(err) return res.status(500).send( err.message);
					stampInPaybook(paybook_user, invoice, res);
					//res.status(200).jsonp(invoice._id);
				});
			})
			.catch(err => {
				console.log('Error getting document', err);
			});
}

function stampInPaybook(paybook_user, invoice, res) {
	var concepts = [];
	var totalConcepts = 0;
	for(var i = 0; i < invoice.invoice.concepts.length; i++){
		totalConcepts += parseFloat(invoice.invoice.concepts[i].amount);
		var object = {
			cantidad : invoice.invoice.concepts[i].quantity,
			unidad : invoice.invoice.concepts[i].unit,
			descripcion : invoice.invoice.concepts[i].description,
			noIdentificacion : invoice.invoice.concepts[i].IdNumber,
			valorUnitario : invoice.invoice.concepts[i].unitValue,
			importe : invoice.invoice.concepts[i].amount
		}
		concepts.push(object);
	}
	totalConcepts = totalConcepts.toFixed(2);
	var retentions = [];
	var totalRetentions = 0;
	for(var i = 0; i < invoice.invoice.taxes.retentions.length; i++){
		totalRetentions += parseFloat(invoice.invoice.taxes.retentions[i].amount);
		var object = {
			impuesto : invoice.invoice.taxes.retentions[i].taxName,
			importe : invoice.invoice.taxes.retentions[i].amount
		}
		retentions.push(object);
	}
	totalRetentions = totalRetentions.toFixed(2);
	var transfers = [];
	var totalTransfers = 0;
	for(var i = 0; i < invoice.invoice.taxes.transfers.length; i++){
		totalTransfers += parseFloat(invoice.invoice.taxes.transfers[i].amount);
		var object = {
			impuesto : invoice.invoice.taxes.transfers[i].taxName,
			tasa : invoice.invoice.taxes.transfers[i].rate,
			importe : invoice.invoice.taxes.transfers[i].amount
		}
		transfers.push(object);
	}
	totalTransfers = totalTransfers.toFixed(2);
	var regimenes = [];
	for(var i = 0; i < invoice.invoice.issuer.regime.length; i++){
		var object = {
			regimen : invoice.invoice.issuer.regime[i].regime
		}
		regimenes.push(object);
	}
	var total = totalConcepts - totalTransfers - totalRetentions;
	total = total.toFixed(2);
	var date = new Date(invoice.unix_timestamp).getTime() - 21600*1000 + Math.floor((Math.random() * 20000) + 2000);
	var new_iso_date = new Date(date).toISOString().substring(0, 19);
	var data = {
	  api_key: process.env.PAYBOOK_KEY,
	  id_user: paybook_user,
	  id_provider: 'acme',
	  invoice_data: {
	    serie: invoice.invoice.params.serie,
	    folio: invoice.invoice.params.folio,
	    fecha: new_iso_date,
	    formaDePago: invoice.invoice.params.paymentMethod,
	    subTotal : totalConcepts.toString(),
			moneda : invoice.invoice.params.currency,
			total : total.toString(),
			tipoDeComprobante : invoice.invoice.params.typeOfVoucher,
			metodoDePago : invoice.invoice.params.methodOfPayment,
			lugarExpedicion : invoice.invoice.params.expeditionPlace,
			numCtaPago : invoice.invoice.params.paymentAccountNumber,
	    emisor : {
	      nombre : invoice.invoice.issuer.name,
	      rfc : invoice.invoice.issuer.rfc,
				domicilioFiscal :{
					calle : invoice.invoice.issuer.address.street,
					municipio : invoice.invoice.issuer.address.municipality,
					estado : invoice.invoice.issuer.address.state,
					pais : invoice.invoice.issuer.address.country,
					codigoPostal : invoice.invoice.issuer.address.postalCode
				},
				expedidoEn:{
					calle : invoice.invoice.issuer.issuedIn.street,
					municipio : invoice.invoice.issuer.issuedIn.municipality,
					estado : invoice.invoice.issuer.issuedIn.state,
					pais : invoice.invoice.issuer.issuedIn.country,
					codigoPostal : invoice.invoice.issuer.issuedIn.postalCode
				},
				regimenFiscal : regimenes
	    },
	    receptor : {
				rfc : invoice.invoice.reciever.rfc,
				nombre : invoice.invoice.reciever.name,
				domicilio :{
					calle : invoice.invoice.reciever.address.street,
					municipio : invoice.invoice.reciever.address.municipality,
					estado : invoice.invoice.reciever.address.state,
					pais : invoice.invoice.reciever.address.country,
					codigoPostal : invoice.invoice.reciever.address.postalCode
				}
			},
			conceptos : concepts,
			impuestos : {
				totalImpuestosRetenidos : totalRetentions.toString(),
				totalImpuestosTrasladados : totalTransfers.toString(),
				retenciones : retentions,
				traslados : transfers
			}
	  }
	};

	axios.post(process.env.PAYBOOK_URL + 'invoicing/mx/invoices', data, {
	  headers : {
	    'Content-Type' : 'application/json'
	  },
	})
	.then(function(response){
		invoice.invoice_id = response.data.response.uuid;
		invoice.invoice.params.subTotal = totalConcepts.toString();
		invoice.invoice.params.total = total.toString();
		invoice.invoice.taxes.totalTransfers = totalTransfers.toString();
		invoice.invoice.taxes.totalRetentions = totalRetentions.toString();
		invoice.status = "Sealed"
		invoice.save(function(err, invoice){
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(invoice._id);
		});
	  //console.log(response.data.response.uuid);
		//res.status(200).jsonp(invoice._id);
	})
	.catch(function(error){
	  console.log(error);
		res.status(500).send(error);
	});
}
