'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {	
			res.render('voir', {
	    		titre:'voir',
	    	}) 	
});

app.get('/assureur', function(req, res) {
		db.all("SELECT * FROM Assureur", function(err, row) {	
			res.render('tableAssur', {
	    		titre:'voir',
	    		table:'assureurs',
	    		data:row
	    	})
		});	  	
});

app.get('/supprimerAssureur/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM Assureur WHERE Nom = ? and Adresse =  ?", [tab[0], tab[1]]);
	db.run("END");

	res.redirect("/voirDB/assureur");
		  	
});

app.get('/editerAssureur/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.all("SELECT * FROM Assureur WHERE Nom = '"+tab[0]+"' and Adresse =  '"+tab[1]+"'", function(err, row) {
		res.render('ajoutAssur', {
	    	titre:'voir',
	    	data:row
	    });
	});
});

app.post('/editerAssureur/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE Assureur SET Nom = '"+req.body.nom+ "' , Adresse = '"+req.body.adresse+
								"' , Telephone = '"+req.body.tel+"' , Fax = '"+req.body.fax+
								"' WHERE Nom = '"+tab[0]+"' and Adresse = '"+tab[1]+"'");
	db.run("END");
	res.redirect("/voirDB/assureur");
});

app.get('/contratAssur', function(req, res) {
		db.all("SELECT * FROM ContratAssur", function(err, row) {	
			res.render('tableContrAssur', {
	    		titre:'voir',
	    		table:"contrats d'assurance",
	    		data:row
	    	})
		}); 	
});

app.get('/supprimerContrAssur/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM ContratAssur WHERE NumContrat = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/contratAssur");
		  	
});

app.get('/editerContrAssur/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM ContratAssur WHERE NumContrat = "+condition, function(err, row) {
		db.all("SELECT Nom, Adresse FROM Assureur", function(err, row2) {
			res.render('ajoutContrAssur', {
	    		titre:'voir',
	    		data:row,
	    		assureur:row2
	    	});
		});
	});
});

app.post('/editerContrAssur/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE ContratAssur SET Type = '"+req.body.type+ "' , NomAssureur = '"+req.body.nom+
								"' , AdresseAssureur = '"+req.body.adresse+
								"' WHERE NumContrat = "+condition);
	db.run("END");
	res.redirect("/voirDB/contratAssur");
});

app.get('/clients', function(req, res) {
		db.all("SELECT * FROM Client", function(err, row) {	
			res.render('tableClient', {
	    		titre:'voir',
	    		table:"clients",
	    		data:row
	    	})
		}); 	
});

app.get('/voitures', function(req, res) {
		db.all("SELECT * FROM Voiture", function(err, row) {	
			res.render('tableVoiture', {
	    		titre:'voir',
	    		table:"voitures",
	    		data:row
	    	})
		});  	
});

app.get('/classesTarif', function(req, res) {
		db.all("SELECT * FROM classeTarif", function(err, row) {	
			res.render('tableTarif', {
	    		titre:'voir',
	    		table:"classes de tarification",
	    		data:row
	    	})
		});  	
});

app.get('/formules', function(req, res) {
		db.all("SELECT * FROM formLoc", function(err, row) {	
			res.render('tableForm', {
	    		titre:'voir',
	    		table:"formules de location",
	    		data:row
	    	})
		});
});

app.get('/modeles', function(req, res) {
		db.all("SELECT * FROM ModeleVoiture", function(err, row) {	
			res.render('tableModele', {
	    		titre:'voir',
	    		table:"modèles de voiture",
	    		data:row
	    	})
		});
});

app.get('/reservation', function(req, res) {
		db.all("SELECT * FROM reservation", function(err, row) {	
			res.render('tableReserv', {
	    		titre:'voir',
	    		table:"réservations",
	    		data:row
	    	})
		});
});

app.get('/contratLoc', function(req, res) {
		db.all("SELECT * FROM contratLoc", function(err, row) {	
			res.render('tableLoc', {
	    		titre:'voir',
	    		table:"contrats de location",
	    		data:row
	    	})
		});
});

app.get('/retour', function(req, res) {
		db.all("SELECT * FROM retour", function(err, row) {	
			res.render('tableRetour', {
	    		titre:'voir',
	    		table:"bons de retour",
	    		data:row
	    	})
		});
});

app.get('/factures', function(req, res) {
		db.all("SELECT * FROM facture", function(err, row) {	
			res.render('tableFacture', {
	    		titre:'voir',
	    		table:"factures",
	    		data:row
	    	})
		});
});

module.exports = app;