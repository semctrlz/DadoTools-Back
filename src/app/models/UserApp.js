import Sequelize, { Model } from 'sequelize';

class UserApp extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_app: Sequelize.INTEGER,
        nivel: Sequelize.INTEGER,
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

export default UserApp;
