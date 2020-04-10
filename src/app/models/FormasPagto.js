import Sequelize, { Model } from 'sequelize';

class FormasPagto extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_forma_pagto: Sequelize.STRING,
        nome_forma_pagto: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default FormasPagto;
