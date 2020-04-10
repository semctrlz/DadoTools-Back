"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);


class InfoCadastroClientes extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: _sequelize2.default.INTEGER,
        id_cadastro: _sequelize2.default.INTEGER,
        mensagem: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.CadastroClientes, {
      foreignKey: 'id_cadastro'
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_usuario'
    });

  }

}

exports. default = InfoCadastroClientes;
