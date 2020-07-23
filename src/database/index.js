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
import CategoriaTickets from '../app/models/CategoriaTickets';
import SubcategoriaTickets from '../app/models/SubcategoriaTickets';

import databaseConfig from '../config/database';
import CadastroClientes from '../app/models/CadastrosClientes';
import InfoCadastroClientes from '../app/models/InfoCadastroClientes';

import Ticket from '../app/models/Ticket';
import TicketsFile from '../app/models/TicketsFile';
import TicketsUpdatesFile from '../app/models/TicketsUpdatesFile';
import TicketsFormatado from '../app/models/TicketsFormatado';
import TicketsUpdates from '../app/models/TicketsUpdates';
import TicketsUpdatesFormatados from '../app/models/TicketsUpdatesFormatados';
import EncerramentoTicket from '../app/models/EncerramentoTicket';
import AvaliacaoTicket from '../app/models/AvaliacaoTicket';
import TicketsGrupos from '../app/models/TicketsGrupos';
import Recoverys from '../app/models/Recoverys';
import GrupoUserTicket from '../app/models/GrupoUserTicket';
import FiltrosTabelasPrecos from '../app/models/FiltrosTabelasPrecos';

const models = [
  User,
  File,
  App,
  UserApp,
  CadastroClientes,
  CondicoesPagto,
  InfoCadastroClientes,
  FormasPagto,
  Responsabilidades,
  Segmento,
  CategoriaTickets,
  SubcategoriaTickets,
  Ticket,
  TicketsFile,
  TicketsFormatado,
  TicketsUpdates,
  TicketsUpdatesFormatados,
  EncerramentoTicket,
  AvaliacaoTicket,
  TicketsUpdatesFile,
  TicketsGrupos,
  Recoverys,
  GrupoUserTicket,
  FiltrosTabelasPrecos,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
