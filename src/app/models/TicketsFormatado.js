import Sequelize, { Model } from 'sequelize';

class TicketsFormatado extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ticket: Sequelize.INTEGER,
        texto_json: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ticket, {
      foreignKey: 'id_ticket',
      as: 'formatado',
    });
  }
}

export default TicketsFormatado;
