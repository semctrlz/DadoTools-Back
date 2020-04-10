"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class FormasPagto extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        cod_forma_pagto: _sequelize2.default.STRING,
        nome_forma_pagto: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

exports. default = FormasPagto;
