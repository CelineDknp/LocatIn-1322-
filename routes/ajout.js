'use strict';

var express = require("express");
var app     = express.Router();
var sqlite3 = require("sqlite3").verbose();
var file = "LINGE1322.sqlite";
var db = new sqlite3.Database(file);

app.get('/', function(req, res) {	
			res.render('ajoutDB', {
	    		titre:'voir',
	    	}) 	
});

app.get('/assureur', function(req, res) {
	res.render('ajoutAssur', {
    	titre:'ajout',
    	data:"null"
    });
});

app.post('/assureur', function(req, res) {
	var nomF = req.body.nom;
	var adresseF = req.body.adresse;
	var telephoneF = req.body.tel;
	var faxF = req.body.fax;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR REPLACE INTO Assureur (Nom, Adresse, Telephone, Fax) VALUES (?,?,?,?)", [nomF, adresseF, telephoneF, faxF]);
    db.run("END");
    console.log("Assureur ajouté avec succès");
    res.redirect('/voirDB/assureur');
});

app.get('/contratAssur', function(req, res) {
	db.all("SELECT Nom, Adresse FROM Assureur", function(err, row) {	
		res.render('ajoutContrAssur', {
			titre:'ajout',
	    	assureur:row,
	    	data:"null"
	    });
	});
});

app.post('/contratAssur', function(req, res) {
	var typeF = req.body.type;
	var adresseF = req.body.adresse;
	var nomF = req.body.nom;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR REPLACE INTO ContratAssur (Type, NomAssureur, AdresseAssureur) VALUES (?,?,?)", [typeF, nomF, adresseF]);
    db.run("END");
    console.log("Contrat d'assurance ajouté avec succès");
    res.redirect('/voirDB/contratAssur');
});

app.get('/clients', function(req, res) {
		res.render('ajoutClient', {
			titre:'ajout'
	    });
});

app.post('/clients', function(req, res) {
	var prenomF = req.body.prenom;
	var adresseF = req.body.adresse;
	var nomF = req.body.nom;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO Client (Nom, Prenom, Adresse) VALUES (?,?,?)", [nomF, prenomF, adresseF]);
    db.run("END");
    console.log("Client ajouté avec succès");
    res.redirect('/');
});

app.get('/voitures', function(req, res) {
	db.all("SELECT Code FROM ModeleVoiture", function(err, row) {	
		res.render('ajoutVoiture', {
			titre:'ajout',
			modele:row
	    });
	});
});

app.post('/voitures', function(req, res) {
	var dateF = req.body.date;
	var prixF = req.body.prix;
	var codeF = req.body.code;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO Voiture (DateAchat, PrixAchat, Statut, CodeModele) VALUES (?,?,?,?)", [dateF, prixF, "libre", codeF]);
    db.run("END");
    console.log("Voiture ajoutée avec succès");
    res.redirect('/');
});

app.get('/classesTarif', function(req, res) {
	db.all("SELECT Code FROM ModeleVoiture", function(err, row) {
		db.all("SELECT NumContrat FROM ContratAssur", function(err, row2) {	
			res.render('ajoutClasseTarif', {
				titre:'ajout',
				modele:row,
				contrat:row2
	    	});
		});
	});
});

app.post('/classesTarif', function(req, res) {
	var codeT = req.body.codeT;
	var amendeF = req.body.amende;
	var prixF = req.body.prix;
	var codeF = req.body.code;
	var contratF = req.body.contrat;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO ClasseTarif (Code, PrixKM, AmendeJour, CodeModele, Contrat) VALUES (?,?,?,?,?)", [codeT, prixF, amendeF, codeF, contratF]);
    db.run("END");
    console.log("Classe de tarification ajoutée avec succès");
    res.redirect('/');
});

app.get('/formules', function(req, res) {
	db.all("SELECT Code FROM ClasseTarif", function(err, row) {
		res.render('ajoutFormLoc', {
			titre:'ajout',
			tarif:row
	   	});
	});
});

app.post('/formules', function(req, res) {
	var typeF = req.body.type;
	var kmF = req.body.km;
	var codeF = req.body.code;
	var montantF = req.body.montant;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO FormLoc (Type, KMForfait, CodeTarif, MontantForfait) VALUES (?,?,?,?)", [typeF, kmF, codeF, montantF]);
    db.run("END");
    console.log("Formule de location ajoutée avec succès");
    res.redirect('/');
});

app.get('/modeles', function(req, res) {
	db.all("SELECT Code FROM classeTarif", function(err, row) {
		res.render('ajoutModele', {
			titre:'ajout',
			tarif:row
	   	});
	});
});

app.post('/modeles', function(req, res) {
	var codeF = req.body.code;
	var libelleF = req.body.libelle;
	var marqueF = req.body.marque;
	var typeF = req.body.type;
	var puissanceF = req.body.puissance;
	var tariF = req.body.codeT;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO ModeleVoiture (Code, Libelle, Marque, Type, Puissance, CodeTarif) VALUES (?,?,?,?,?,?)", 
												[codeF, libelleF, marqueF, typeF, puissanceF, tariF]);
    db.run("END");
    console.log("Modèle de voiture ajouté avec succès");
    res.redirect('/');
});

app.get('/reservation', function(req, res) {
	db.all("SELECT NClient FROM Client", function(err, row) {
		db.all("SELECT NVoiture FROM Voiture WHERE Statut='libre'", function(err, row2) {
			res.render('ajoutReservation', {
				titre:'ajout',
				client:row,
				voiture:row2,
	   		});
		});
	});
});

app.post('/reservation', function(req, res) {
	var clientF = req.body.client;
	var dateF = req.body.date;
	var voitureF = req.body.voiture;
	var typeF = req.body.type;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT INTO Reservation (NCLient, Etat, Date, Voiture, TypeLoc, DateSuppression, NouvelleReserv) VALUES (?,?,?,?,?,?,?)", 
												[clientF, "Effectif", dateF, voitureF, typeF, null, null]);
    db.run("END");
    console.log("Réservation ajoutée avec succès");
    res.redirect('/');
});

app.get('/contratLoc', function(req, res) {
	db.all("SELECT ID FROM Reservation", function(err, row) {
		res.render('ajoutContratLoc', {
			titre:'ajout',
			reserv:row
	   	});
	});
});

app.post('/contratLoc', function(req, res) {
	var reservF = req.body.reserv;
	var permisF = req.body.permis;
	var kmF = req.body.km;
	var cautionF = req.body.caution;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO ContratLoc (NReserv, NPermis, KMDepart, Caution) VALUES (?,?,?,?)", 
												[reservF, permisF, kmF, cautionF]);
    db.all("SELECT Voiture FROM Reservation WHERE ID="+reservF, function(err, voiture) {
    	db.run("UPDATE Voiture SET Statut = ? WHERE NVoiture = ?", ["empruntée", voiture.Voiture]);
    });
    db.run("END");
    console.log("Contrat de location ajouté avec succès");
    res.redirect('/');
});

app.get('/retour', function(req, res) {
	db.all("SELECT ID FROM Reservation", function(err, row) {
		res.render('ajoutRetour', {
			titre:'ajout',
			reserv:row
	   	});
	});
});

app.post('/retour', function(req, res) {
	var reservF = req.body.reserv;
	var dateF = req.body.date;
	var kmF = req.body.km;
	var repF = req.body.rep;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO Retour (NReserv, KMRetour, DateRetour, Reparation) VALUES (?,?,?,?)", 
												[reservF, kmF, dateF, repF]);
    
    var statut = 'En réparation';
    if(repF=='Non'){
    	statut = 'libre';
    }
    db.all("SELECT Voiture FROM Reservation WHERE ID="+reservF, function(err, voiture) {
    	db.run("UPDATE Voiture SET Statut = ? WHERE NVoiture = ?", [statut, voiture.Voiture]);
    });
    db.run("END");
    //TODO : mettre voiture en "libre ou réparation"
    console.log("Bon de retour ajouté avec succès");
    res.redirect('/');
});

app.get('/factures', function(req, res) {
	db.all("SELECT ID FROM Reservation", function(err, row) {
		res.render('ajoutFacture', {
			titre:'ajout',
			reserv:row
	   	});
	});
});

app.post('/factures', function(req, res) {
	var reservF = req.body.reserv;
	db.run("BEGIN TRANSACTION");
	db.run("INSERT OR IGNORE INTO Facture (NReserv) VALUES (?)", [reservF]);
    db.run("END");
    console.log("Facture ajoutée avec succès");
    res.redirect('/');
});

module.exports = app;