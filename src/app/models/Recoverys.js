import Sequelize, { Model } from 'sequelize';

class Recoverys extends Model {
  static init(sequelize) {
    super.init(
      {
        token: Sequelize.STRING,
        id_usuario: Sequelize.INTEGER,
        ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recoverys;
