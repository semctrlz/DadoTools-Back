"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Responsabilidades extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        gerente_geral: _sequelize2.default.STRING,
        gerente_comercial: _sequelize2.default.STRING,
        supervisor: _sequelize2.default.STRING,
        vendedor: _sequelize2.default.STRING,
        cod_rota: _sequelize2.default.STRING,
        nome_rota: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

exports. default = Responsabilidades;
