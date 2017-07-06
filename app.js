import express from 'express';
import logger from 'morgan';
const bodyParser = require('body-parser');
const path = require('path');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

//setting up the app templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/template'));
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
//
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).render('index.html'));

module.exports = app;