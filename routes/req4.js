'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	var s0 = "Select Libelle, Code, count(NVoiture) as 'Voitures', avg(PrixAchat) as 'Prix' ";
	var s1 = "from Voiture V, ModeleVoiture M where V.CodeModele=M.Code group by Libelle "; 
	db.all(s0+s1, function(err, row) {
		res.render('req4', {
			titre:'voitures',
			data:row
		});
	});
});

module.exports =app;