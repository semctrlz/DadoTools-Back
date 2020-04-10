"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _App = require('../app/models/App'); var _App2 = _interopRequireDefault(_App);
var _UserApp = require('../app/models/UserApp'); var _UserApp2 = _interopRequireDefault(_UserApp);
var _CondicoesPagto = require('../app/models/CondicoesPagto'); var _CondicoesPagto2 = _interopRequireDefault(_CondicoesPagto);
var _FormasPagto = require('../app/models/FormasPagto'); var _FormasPagto2 = _interopRequireDefault(_FormasPagto);
var _Responsabilidades = require('../app/models/Responsabilidades'); var _Responsabilidades2 = _interopRequireDefault(_Responsabilidades);
var _Segmento = require('../app/models/Segmento'); var _Segmento2 = _interopRequireDefault(_Segmento);



var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _CadastrosClientes = require('../app/models/CadastrosClientes'); var _CadastrosClientes2 = _interopRequireDefault(_CadastrosClientes);
var _InfoCadastroClientes = require('../app/models/InfoCadastroClientes'); var _InfoCadastroClientes2 = _interopRequireDefault(_InfoCadastroClientes);


const models =
[
  _User2.default,
  _File2.default,
  _App2.default,
  _UserApp2.default,
  _CadastrosClientes2.default,
  _CondicoesPagto2.default,
  _InfoCadastroClientes2.default,
  _FormasPagto2.default,
  _Responsabilidades2.default,_Segmento2.default
];

class Database {
  constructor(){
    this.init();
    this.mongo();
  }

  init(){
    this.connection = new (0, _sequelize2.default)(_database2.default);
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongoConnection = _mongoose2.default.connect(
      process.env.MONGO,
      {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useFindAndModify: true}
    )
  }
}

exports. default = new Database();
