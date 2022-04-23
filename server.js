
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var morgan = require('morgan');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var appRoutes = require('./app/routes/api')(router);
var path = require('path');
// var MongoStore = require('connect-mongo')(session);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var qs = require('querystring');
var request = require('request');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Serve frontend view
app.use('/',express.static(__dirname + '/views'));

// mongoose.connect('mongodb://localhost:27017/manufacturingApp', {useUnifiedTopology: true, useNewUrlParser: true, 
// 	useCreateIndex: true, useFindAndModify: false }, function(err) {
// 	if (err) {
// 		console.log("Not connected to db: " + err);
// 	} else {
// 		console.log("successfully connected to db");
// 	}
// });

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

const port = 9005;

// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);
