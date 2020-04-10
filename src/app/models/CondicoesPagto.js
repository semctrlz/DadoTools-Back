import Sequelize, { Model } from 'sequelize';

class CondicoesPagto extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_condicao_pagto: Sequelize.STRING,
        nome_condicao_pagto: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default CondicoesPagto;
