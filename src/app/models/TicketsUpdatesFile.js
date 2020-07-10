import Sequelize, { Model } from 'sequelize';

class TicketsUpdatesFile extends Model {
  static init(sequelize) {
    super.init(
      {
        id_update: Sequelize.INTEGER,
        id_anexo: Sequelize.STRING,
        nome: Sequelize.STRING,
        size: Sequelize.NUMBER,
        url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.TicketsUpdates, {
      foreignKey: 'id_update',
      as: 'anexos_update',
    });
  }
}

export default TicketsUpdatesFile;
