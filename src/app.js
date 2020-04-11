var express =require('express');
var cors = require('cors');
var path = require('path');
var routes = require ('./routes');
require('./database');

class App{
  constructor(){
    this.server = express();
    this.cors()
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname,'..','temp', 'uploads')));
  }

  cors(){
    this.server.use(cors(
      {
        origin: 'https://dadotools.netlify.com',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    ));
  }

  routes(){
    this.server.use(routes);
  }
}

module.exports =  new App().server;
