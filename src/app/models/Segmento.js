import Sequelize, { Model } from 'sequelize';

class Segmento extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_segmento: Sequelize.STRING,
        nome_segmento: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Segmento;
