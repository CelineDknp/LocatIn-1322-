'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	var s0 = "SELECT Nom, Prenom, count(distinct ID) as 'Nombre' ";
	var s1 = "from Client C, Reservation R, FormLoc L where C.NClient = R.NClient and R.TypeLoc=L.Type group by Nom, Prenom ";
	var s2 = "union SELECT Nom, Prenom, 0 as 'Nombre' ";
	var s3 = "from Client where not exists (select * from Reservation R where Client.NClient=R.NClient) order by Nom";
	db.all(s0+s1+s2+s3, function(err, row) {
		res.render('req5', {
			titre:'fidelite',
			data:row
		});
	});
});

module.exports =app;