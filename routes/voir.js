'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {
	res.render('voir', {
		titre:'voir'
	});
});

app.get('/assureur', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM Assureur", function(err, row) {	
			res.render('tableAssur', {
	    		titre:'voir',
	    		table:'assureurs',
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/contratAssur', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM ContratAssur", function(err, row) {	
			res.render('tableContrAssur', {
	    		titre:'voir',
	    		table:"contrats d'assurance",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/clients', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM Client", function(err, row) {	
			res.render('tableClient', {
	    		titre:'voir',
	    		table:"clients",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/voitures', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM Voiture", function(err, row) {	
			res.render('tableVoiture', {
	    		titre:'voir',
	    		table:"voitures",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/classesTarif', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM classeTarif", function(err, row) {	
			res.render('tableTarif', {
	    		titre:'voir',
	    		table:"classes de tarification",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/formules', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM formLoc", function(err, row) {	
			res.render('tableForm', {
	    		titre:'voir',
	    		table:"formules de location",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/modeles', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM ModeleVoiture", function(err, row) {	
			res.render('tableModele', {
	    		titre:'voir',
	    		table:"modèles de voiture",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/reservation', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM reservation", function(err, row) {	
			res.render('tableReserv', {
	    		titre:'voir',
	    		table:"réservations",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/contratLoc', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM contratLoc", function(err, row) {	
			res.render('tableLoc', {
	    		titre:'voir',
	    		table:"contrats de location",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/retour', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM retour", function(err, row) {	
			res.render('tableRetour', {
	    		titre:'voir',
	    		table:"bons de retour",
	    		data:row
	    	})
		});
		
	});	  	
});

app.get('/factures', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM facture", function(err, row) {	
			res.render('tableFacture', {
	    		titre:'voir',
	    		table:"factures",
	    		data:row
	    	})
		});
		
	});	  	
});

module.exports = app;