import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import Logger from 'js-logger';
import dotenv from 'dotenv';
import debug from 'debug';
import open from 'open';
import webpack from 'webpack';
import morgan from 'morgan';
import socket from 'socket.io';
import config from '../webpack.config.dev';
import authenticate from './middleware/auth';
import db from './models/';

const app = express();
dotenv.config();
Logger.useDefaults();
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

/**
 * 
 * par of the http server
 * @param {any} error 
 * @returns {void}
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 * @return {void}
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Application is Listening on ${bind}`);
};

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV != 'test') {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

/** Setup a default catch-all 
 *  route that sends back 
 *  a welcome message in JSON format.
 */
require('./routes')(app);
app.get('*', (req, res) => {
  res.status(200)
  .sendFile(path.join(__dirname, '../client/index.html'));
});

// This will be our application entry. We'll setup our server here.
const port = parseInt(process.env.PORT, 10);
app.set('port', port);
const server = http.createServer(app);

//declare socket for real time 
const io = socket(server);
export { io };  
io.on('connect', (soc)=>{
  console.log('connected');
  soc.on('newMessage', (payload)=>{
    console.log(payload);
    soc.broadcast.emit('groupMessage', payload);
  });
  soc.on('disconnect',()=>{
    console.log('Disconnected');
  });
});
server.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
  }
});

export default app;