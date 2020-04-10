"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);


class UserApp extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: _sequelize2.default.INTEGER,
        id_app: _sequelize2.default.INTEGER,
        is_admin: _sequelize2.default.BOOLEAN
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.App, { foreignKey: 'id_app', as: 'Apps' });
  }

}

exports. default = UserApp;
