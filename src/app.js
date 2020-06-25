const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
require('./database');

class App {
  constructor() {
    this.server = express();
    this.cors();
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
    const whitelist = [
      process.env.HOST,
      'https://server.zware.com.br',
      'https://server.zware.com.br/avatar',
      'https://dadotools.netlify.app/',
    ];

    const corsOptions = {
      Origin: [whitelist],
      exposedHeaders: [
        'Access-Control-Allow-Origin',
        'Vary',
        'Content-Length',
        'X-Total-Count',
      ],
    };
    this.server.use(cors(corsOptions));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
