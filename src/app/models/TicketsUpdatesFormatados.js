import Sequelize, { Model } from 'sequelize';

class TicketsUpdatesFormatados extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ticket_update: Sequelize.INTEGER,
        texto_json: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.TicketsUpdates, {
      foreignKey: 'id',
    });
  }
}

export default TicketsUpdatesFormatados;
