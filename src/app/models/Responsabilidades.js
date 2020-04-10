import Sequelize, { Model } from 'sequelize';

class Responsabilidades extends Model {
  static init(sequelize) {
    super.init(
      {
        gerente_geral: Sequelize.STRING,
        gerente_comercial: Sequelize.STRING,
        supervisor: Sequelize.STRING,
        vendedor: Sequelize.STRING,
        cod_rota: Sequelize.STRING,
        nome_rota: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Responsabilidades;
