import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import Logger from 'js-logger';
import authenticate from './middleware/auth';
import dotenv from 'dotenv';
import debug from 'debug';
import db from './models/';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';
import morgan from 'morgan';


// Set up the express app
const app = express();

//config setup
dotenv.config();
debug('dms:server');
Logger.useDefaults();
const compiler = webpack(config);
app.use(morgan());
/**
 * Normalize a port into a number, string, or false.
 * @param {number} val port number to be used
 * @returns {any} res
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

//par of the http server
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`🚧 Application is Listening on ${bind}`);
};

db.sequelize.sync()
  .then(() => server.listen(port))
  .then(() => Logger
    .warn(`🚧 Application is Listening on ${port}`))
  .catch(error => Logger.error(error));


//rendering static files
app.set('views', path.join(__dirname, '/template'));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routes')(app);
app.get('*', (req, res) => {
  res.status(200)
  .sendFile(path.join( __dirname, '../client/index.html'));
});

// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10);
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
export default app;