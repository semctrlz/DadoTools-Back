"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class App extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        descricao: _sequelize2.default.STRING,
        rota: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

exports. default = App;
