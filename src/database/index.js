import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/File';
import App from '../app/models/App';
import UserApp from '../app/models/UserApp';
import CondicoesPagto from '../app/models/CondicoesPagto';
import FormasPagto from '../app/models/FormasPagto';
import Responsabilidades from '../app/models/Responsabilidades';
import Segmento from '../app/models/Segmento';



import databaseConfig from '../config/database';
import MongoCredentials from '../credentials/mongo';
import CadastroClientes from '../app/models/CadastrosClientes';
import InfoCadastroClientes from '../app/models/InfoCadastroClientes';

import Responsabilidades from '../app/models/Responsabilidades';
const models =
[
  User,
  File,
  App,
  UserApp,
  CadastroClientes,
  CondicoesPagto,
  InfoCadastroClientes,
  FormasPagto,
  Responsabilidades,Segmento
];

class Database {
  constructor(){
    this.init();
    this.mongo();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongoConnection = mongoose.connect(
      MongoCredentials.connectionString,
      {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useFindAndModify: true}
    )
  }
}

export default new Database();
