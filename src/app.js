const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./Routes/index.js');
require('./database');

class App {
  constructor() {
    this.server = express();
    this.cors();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      express.json({
        limit: '5mb',
      })
    );
    this.server.use(express.urlencoded({ extended: true }));
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
      'https://dadotools.netlify.app/',
      'https://server.zware.com.br',
      'https://server.zware.com.br/avatar',
      'https://dadotools.netlify.app/',
      'https://dadotools.app.br/',
      'http://localhost:8081',
      '*',
    ];

    const corsOptions = {
      origin: whitelist,
      exposedHeaders: [
        'origin',
        'x-requested-with',
        'content-type',
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
