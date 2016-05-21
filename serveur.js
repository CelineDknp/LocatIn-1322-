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

var debug = require('debug')('test:server');
var http = require('http');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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
var req5 = require('./routes/req5.js');

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
app.use('/fidelite', req5);


app.use(function(req, res, next){
	res.render('404', {});

});

//app.listen(8080);

console.log("Running at Port 8080");