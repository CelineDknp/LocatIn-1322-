'use strict';
//Ouverture de la db
var sqlite3 = require("sqlite3").verbose();
//Charger les dépendences nécéssaires
var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');//Pour récupérer les input des différents forms
var engines = require('consolidate');//Pour utiliser ejs pour les pages dynamiques
var cookieParser = require('cookie-parser');//Des cookies !
var session = require('express-session');//Des sessions

//Les chemins où trouver les fichiers statiques
app.use(express.static(path.join(__dirname, '/public')));
app.use('public/styles', express.static(path.join(__dirname, 'public/style')));


//Gérer les sessions
app.use(cookieParser());
app.use(session({
	secret: 'ldkgKGUDU467LHkg',
	resave: true,
	saveUninitialized: false
}));
// Middleware pour gérer les requêtes POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
var accueil = require('./routes/accueil.js');
var ajout = require('./routes/ajout.js');
var voir = require('./routes/voir.js');
var req1 = require('./routes/req1.js');
var req2 = require('./routes/req2.js');
var req3 = require('./routes/req3.js');
var req4 = require('./routes/req4.js');

//set l'engine des pages dynamiques à ejs
app.set('view engine', 'ejs');

//Set des routes
app.use('/', accueil);
app.use('/ajoutDB', ajout);
app.use('/voirDB', voir);
app.use('/contratModele', req1);
app.use('/factures', req2);
app.use('/dedommagement', req3);
app.use('/voitures', req4);


app.use(function(req, res, next){
	res.render('404', {});

});

app.listen(8080);

console.log("Running at Port 8080");