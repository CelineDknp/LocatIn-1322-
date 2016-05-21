'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	var s1 = "SELECT distinct M.Code as 'Code', Libelle, NumContrat, C.Type as 'Type', ";
	var s2 = "NomAssureur, AdresseAssureur, Telephone ";
	var s3 = "from ModeleVoiture M, ClasseTarif T, ContratAssur C, Assureur A where M.CodeTarif=T.Code and T.Contrat=C.NumContrat and C.NomAssureur=A.Nom";
	db.all(s1+s2+s3, function(err, row) {
		res.render('req1', {
			titre:'contrat',
			data:row
		});
	});
});

module.exports =app;