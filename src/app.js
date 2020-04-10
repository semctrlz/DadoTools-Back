import express from 'express';
import Cors from 'cors';
import path from 'path';
import routes from './routes';
import './database';



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
    this.server.use(Cors({
      origin: 'http://localhost:3000'
    }));
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;
