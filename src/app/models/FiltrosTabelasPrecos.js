import Sequelize, { Model } from 'sequelize';

class FiltrosTabelasPrecos extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        json: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'config_filtros',
    });
  }
}

export default FiltrosTabelasPrecos;
