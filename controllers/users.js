var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
		res.status(200).jsonp(users);
	});
};

exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /users/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var user = new User({
		name:    req.body.name,
		sexo: 	  req.body.sexo,
    direccion: {
      calle: req.body.direccion.calle,
      numero: req.body.direccion.numero
    }
	});

	user.save(function(err, user) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.name   = req.body.name;
		user.sexo    = req.body.sexo;

		user.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(user);
		});
	});
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};
