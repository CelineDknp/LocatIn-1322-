'use strict';

var express = require("express");
var app     = express.Router();

app.get('/', function(req, res) {
	res.render('accueil', {
		titre:'accueil'
	});
});

module.exports = app;