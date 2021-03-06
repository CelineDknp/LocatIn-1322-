'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	var s0 = "DROP TABLE IF EXISTS 'DetailFacture'; ";
	var s1 = "CREATE TABLE IF NOT EXISTS DetailFacture as SELECT NClient as 'NCli', ID, MontantForfait, ";
	var s2 = "Case when Caution='Payée' then -((MontantForfait/100)*20) else (MontantForfait/100)*3 end as 'Caution', ";
	var s3 = "Case when (KMRetour-KMDepart) >KMForfait then (KMRetour-KMDepart-KMForfait)*PrixKM else 0 end as 'FraisKMSupp', ";
	var s4 = "Case when (DateRetour-Date)>7 and TypeLoc='semaine' then  (DateRetour-Date-7)*AmendeJour ";
	var s5 = "when (DateRetour-Date)>2.45 and TypeLoc='weekEnd' then  (DateRetour-Date-2.45)*AmendeJour ";
	var s6 = "when (DateRetour-Date)>1 and TypeLoc='jour' then  (DateRetour-Date-1)*AmendeJour else 0 end as 'FraisRetard', ";
	var s7 = "Case when exists (select ID from Reservation R where Res.ID=R.NouvelleReserv) then AmendeJour else 0 end as 'Dedommagement' ";
	var s8 = "FROM ContratLoc C, Retour R, Reservation Res, FormLoc L, ClasseTarif T, Voiture V ";
	var s9 = "where C.NReserv=R.NReserv and R.NReserv=Res.ID and Res.TypeLoc=L.type and Res.Etat='Terminée' and ";
	var s10 = "Res.Voiture=V.NVoiture and V.CodeModele=T.CodeModele and T.Code=L.CodeTarif ";
	db.run("BEGIN TRANSACTION");
	db.run(s0);
	db.run(s1+s2+s3+s4+s5+s6+s7+s8+s9+s10);
	var s11 = "SELECT NClient, Nom, ID, MontantForfait, Caution, FraisKMSupp, FraisRetard, Dedommagement, ";
	var s12 = "MontantForfait + Caution + FraisKMSupp + FraisRetard - Dedommagement as 'Total' ";
	var s13 = "FROM DetailFacture D, Client C WHERE D.NCli=C.NClient";
	var fullS = s11+s12+s13;
	db.all(fullS, function(err, row) {
		if(row == undefined){
			db.run(s1+s2+s3+s4+s5+s6+s7+s8+s9+s10);
			db.all(fullS, function(err, row2) {
				res.render('req2', {
					titre:'factures',
					data:row2
				});
			});
		}
		else{
			res.render('req2', {
				titre:'factures',
				data:row
			});
		}
	});
	db.run("END");
});

module.exports =app;