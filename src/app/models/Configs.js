import Sequelize, { Model } from 'sequelize';

class Configs extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.STRING,
        nome_config: Sequelize.STRING,
        json: Sequelize.TEXT,
        json_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            return JSON.parse(this.json ? this.json : '{}');
          },
        },
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
      as: 'configs_user',
    });
  }
}

export default Configs;
