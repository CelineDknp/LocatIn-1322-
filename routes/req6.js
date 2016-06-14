'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	db.all("SELECT * FROM ModeleVoiture", function(err, row1) {
		db.all("SELECT distinct Type FROM FormLoc", function(err, row2) {
			res.render('req6_Search', {
				titre:'recherche',
				modele:row1,
				loc:row2
			});
		});
	});
});

app.post('/', function(req, res) {
	var lib = req.body.libelle;
	var marque = req.body.marque;
	var modele = req.body.modele;
	var date = req.body.date;
	var typeLoc = req.body.typeLoc;
	var client = req.body.numero;

	var s1 = "Select NVoiture, Libelle, Marque, M.Type, MontantForfait from Voiture V, ModeleVoiture M, FormLoc F ";
	var s2 = "where M.CodeTarif = F.CodeTarif and F.Type = '"+ typeLoc +"' and V.CodeModele = M.Code and M.Libelle like '%"+ lib +"%' and ";
	var s3 = "M.Marque like '%"+marque+"%' and M.Type like '%"+ modele +"%' and ( V.statut = 'libre' or V.statut > "+ date +")";
	
	db.all(s1+s2+s3, function(err, row) {
		res.render('req6_Result', {
			titre:'recherche',
			data:row,
			dateL:date,
			typeL:typeLoc,
			nClient:client
		});
	});
});

app.get('/:id', function(req, res){
	var infos = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=infos.split(reg);//Tab contient le numéro de voiture en 0, la date en 1, le type de location en 2 et le numéro de client en 3
	db.run("BEGIN TRANSACTION");
	db.run("INSERT INTO Reservation (NCLient, Etat, Date, Voiture, TypeLoc, DateSuppression, NouvelleReserv) VALUES (?,?,?,?,?,?,?)", 
												[tab[3], "Effectif", tab[1], tab[0], tab[2], null, null]);
    db.run("END");
    console.log("Réservation ajoutée avec succès");
    res.redirect('/voirDB/reservation');
	
});

module.exports =app;