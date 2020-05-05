const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
require('./database');

const whitelist = [process.env.HOST];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.server = express();
    this.cors(corsOptions);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/avatar',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads', 'avatar'))
    );
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads', 'files'))
    );
  }

  cors() {
    this.server.use(
      cors({
        exposedHeaders: [
          'Access-Control-Allow-Origin',
          'Vary',
          'Content-Length',
          'X-Total-Count',
        ],
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
