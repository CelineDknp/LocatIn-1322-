'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	var s0 = "SELECT Nom, Prenom, ID, Etat,";
	var s1 = "case when Etat='Supprimée' and (Date-DateSuppression) < 2 then (MontantForfait/100)*3 "; 
	var s2 = "when Etat='Annulée' and NouvelleReserv is null then (-AmendeJour) else 0 end as 'Payer' ";
	var s3 = "FROM Client Cl, Reservation Res, FormLoc L, ModeleVoiture M, ClasseTarif T, Voiture V ";
	var s4 = "where Etat <> 'Effectif' and Etat <> 'Terminée' and Res.NClient=Cl.NClient and Res.Voiture=V.NVoiture and V.CodeModele=M.Code and  ";
	var s5 = "T.Code=M.CodeTarif and Res.TypeLoc=L.type and L.CodeTarif=T.Code";
	db.all(s0+s1+s2+s3+s4+s5, function(err, row) {
		res.render('req3', {
			titre:'dedommagement',
			data:row
		});
	});
});

module.exports =app;