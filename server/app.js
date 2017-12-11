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

const indexPath = process.env.NODE_ENV === 'production' ? 'dist' : 'client';
const app = express();
dotenv.config();
Logger.useDefaults();
app.use(morgan());

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

app.use(express.static(path.join(__dirname, './../assets')));
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, './../dist')));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
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
    .sendFile(path.join(__dirname, `../${indexPath}/index.html`));
});

// This will be our application entry. We'll setup our server here.
const port = process.env.PORT || 8000;
app.set('port', port);
const server = http.createServer(app);

// declare socket for real time 
const io = socket(server);
export { io };  
io.on('connect', (soc) => {
  console.log('connected');
  soc.on('newMessage', (payload) => {
    console.log(payload);
    soc.broadcast.emit('groupMessage', payload);
  });
  soc.on('disconnect', () => {
    console.log('Disconnected');
  });
});
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
  }
});

export default app;