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

	db.all("SELECT * FROM ContratAssur WHERE NumContrat = '"+condition+"'", function(err, row) {
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

app.get('/supprimerClient/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM Client WHERE NClient = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/clients");
		  	
});

app.get('/editerClient/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM Client WHERE NClient = '"+condition+"'", function(err, row) {
			res.render('ajoutClient', {
	    		titre:'voir',
	    		data:row
	    	});
	});
});

app.post('/editerClient/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE Client SET Nom = '"+req.body.nom+ "' , Prenom = '"+req.body.prenom+
								"' , Adresse = '"+req.body.adresse+
								"' WHERE NClient = "+condition);
	db.run("END");
	res.redirect("/voirDB/clients");
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

app.get('/supprimerVoiture/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM Voiture WHERE NVoiture = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/voitures");
		  	
});

app.get('/editerVoiture/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM Voiture WHERE NVoiture = '"+condition+"'", function(err, row) {
		db.all("SELECT Code FROM ModeleVoiture", function(err, row2) {	
			res.render('editVoiture', {
	    		titre:'voir',
	    		data:row,
	    		modele:row2
	    	});
		});
	});
});

app.post('/editerVoiture/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE Voiture SET DateAchat = '"+req.body.date+ "' , PrixAchat = '"+req.body.prix+
								"' , Statut = '"+req.body.statut+"' , CodeModele = '"+req.body.code+
								"' WHERE NVoiture = "+condition);
	db.run("END");
	res.redirect("/voirDB/voitures");
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


app.get('/supprimerClasseTarif/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM classeTarif WHERE Code = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/classesTarif");
		  	
});

app.get('/editerClasseTarif/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM classeTarif WHERE Code = '"+condition+"'", function(err, row) {
		db.all("SELECT Code FROM ModeleVoiture", function(err, row2) {
			db.all("SELECT NumContrat FROM ContratAssur", function(err, row3) {	
				res.render('ajoutClasseTarif', {
					titre:'voir',
					data:row,
					modele:row2,
					contrat:row3
	    		});
			});
		});
	});
});

app.post('/editerClasseTarif/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE classeTarif SET Code = '"+req.body.codeT+ "' , PrixKM = '"+req.body.prix+
								"' , AmendeJour = '"+req.body.amende+"' , CodeModele = '"+req.body.code+
								"' , Contrat = '"+req.body.contrat+"' WHERE Code = "+condition);
	db.run("END");
	res.redirect("/voirDB/classesTarif");
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


app.get('/supprimerFormule/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM formLoc WHERE Type = ? and CodeTarif = ?", [tab[0], tab[1]]);
	db.run("END");

	res.redirect("/voirDB/formules");
		  	
});

app.get('/editerFormule/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.all("SELECT * FROM formLoc WHERE Type = '"+tab[0]+"' and CodeTarif = '"+tab[1]+"'", function(err, row) {
		db.all("SELECT Code FROM ClasseTarif", function(err, row2) {
			res.render('ajoutFormLoc', {
				titre:'voir',
				tarif:row2,
				data:row
	   		});
		});
	});
});

app.post('/editerFormule/:id', function(req, res) {
	var conditions = req.params.id;
	var reg=new RegExp("[,]+", "g");
	var tab=conditions.split(reg);

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE formLoc SET Type = '"+req.body.type+ "' , KMForfait = '"+req.body.km+
								"' , CodeTarif = '"+req.body.code+"' , MontantForfait = '"+req.body.montant+
								"' WHERE Type = '"+tab[0]+"' and CodeTarif = '"+tab[1]+"'");
	db.run("END");
	res.redirect("/voirDB/formules");
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


app.get('/supprimerModele/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM ModeleVoiture WHERE Code = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/modeles");
		  	
});

app.get('/editerModele/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM ModeleVoiture WHERE Code = '"+condition+"'", function(err, row) {
		db.all("SELECT Code FROM classeTarif", function(err, row2) {
			res.render('ajoutModele', {
				titre:'voir',
				tarif:row2,
				data:row
	   		});
		});
	});
});

app.post('/editerModele/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("UPDATE ModeleVoiture SET Code = '"+req.body.code+ "' , Libelle = '"+req.body.libelle+
								"' , Marque = '"+req.body.marque+"' , Puissance = '"+req.body.puissance+
								"' , Type = '"+req.body.type+"' , CodeTarif = '"+req.body.codeT+
								"' WHERE Code = '"+condition+"'");
	db.run("END");
	res.redirect("/voirDB/modeles");
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

app.get('/supprimerReservation/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM Reservation WHERE ID = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/reservation");
		  	
});

app.get('/editerReservation/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM Reservation WHERE ID = '"+condition+"'", function(err, row) {
		db.all("SELECT NClient FROM Client", function(err, row2) {
			db.all("SELECT NVoiture FROM Voiture WHERE Statut='libre'", function(err, row3) {
				db.all("SELECT * FROM Reservation", function(err, row4) {
					res.render('editReservation', {
						titre:'voir',
						client:row2,
						voiture:row3,
						allReserv:row4,
						data:row
	   				});
				});
			});
		});
	});
});

app.post('/editerReservation/:id', function(req, res) {
	var condition = req.params.id;
	var nRes = req.body.nReserv;
	if(nRes=='-'){
		nRes = null;
	}
	db.run("BEGIN TRANSACTION");
	db.run("UPDATE Reservation SET NClient = '"+req.body.client+ "' , Etat = '"+req.body.etat+
								"' , Date = '"+req.body.date+"' , Voiture = '"+req.body.voiture+
								"' , TypeLoc = '"+req.body.type+"' , DateSuppression = '"+req.body.dateS+
								"' , NouvelleReserv = "+nRes+" WHERE ID = '"+condition+"'");
	db.run("END");
	res.redirect("/voirDB/reservation");
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

app.get('/supprimerContratLoc/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM contratLoc WHERE NReserv = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/contratLoc");
		  	
});

app.get('/editerContratLoc/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM contratLoc WHERE NReserv = '"+condition+"'", function(err, row) {
		db.all("SELECT ID FROM Reservation", function(err, row2) {
			res.render('ajoutContratLoc', {
				titre:'voir',
				reserv:row2,
				data:row
	   		});
		});
	});
});

app.post('/editerContratLoc/:id', function(req, res) {
	var condition = req.params.id;
	db.run("BEGIN TRANSACTION");
	db.run("UPDATE contratLoc SET NReserv = "+req.body.reserv+ " , NPermis = '"+req.body.permis+
								"' , KMDepart = '"+req.body.km+"' , Caution = '"+req.body.caution+
								"' WHERE NReserv = "+condition);
	db.run("END");
	res.redirect("/voirDB/contratLoc");
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

app.get('/supprimerRetour/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM retour WHERE NReserv = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/retour");
		  	
});

app.get('/editerRetour/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM retour WHERE NReserv = '"+condition+"'", function(err, row) {
		db.all("SELECT ID FROM Reservation", function(err, row2) {
			res.render('ajoutRetour', {
			titre:'voir',
			reserv:row2,
			data:row
	   		});
		});
	});
});

app.post('/editerRetour/:id', function(req, res) {
	var condition = req.params.id;
	db.run("BEGIN TRANSACTION");
	db.run("UPDATE retour SET NReserv = "+req.body.reserv+ " , DateRetour = '"+req.body.date+
								"' , KMRetour = '"+req.body.km+"' , Reparation = '"+req.body.rep+
								"' WHERE NReserv = "+condition);
	db.run("END");
	res.redirect("/voirDB/retour");
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

app.get('/supprimerFacture/:id', function(req, res) {
	var condition = req.params.id;

	db.run("BEGIN TRANSACTION");
	db.run("DELETE FROM Facture WHERE NFacture = ?", [condition]);
	db.run("END");

	res.redirect("/voirDB/factures");
		  	
});

app.get('/editerFacture/:id', function(req, res) {
	var condition = req.params.id;

	db.all("SELECT * FROM facture WHERE NFacture = '"+condition+"'", function(err, row) {
		db.all("SELECT ID FROM Reservation", function(err, row2) {
			res.render('ajoutFacture', {
			titre:'voir',
			reserv:row2,
			data:row
	   		});
		});
	});
});

app.post('/editerFacture/:id', function(req, res) {
	var condition = req.params.id;
	db.run("BEGIN TRANSACTION");
	db.run("UPDATE facture SET NReserv = "+req.body.reserv+" WHERE NFacture = "+condition);
	db.run("END");
	res.redirect("/voirDB/factures");
});

module.exports = app;