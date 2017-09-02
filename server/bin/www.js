#!/usr/bin/env node
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/* Module dependencies */
import debug from 'debug';
import http from 'http';
import App from '../app';

debug('server:server');

/* Normalize a port into a number, string, or false */
const normalizePort = (val) => {
  const port = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  return false;
};

/* Get port from environment and store in Express */
const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

/* Event listener for HTTP server "error" event */
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;
  const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
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

/* Create HTTP server */
const server = http.createServer(App);

/* Event listener for HTTP server "listening" event */
const onListening = () => {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

/* Listen on provided port, on all network interfaces */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);