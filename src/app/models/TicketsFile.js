import Sequelize, { Model } from 'sequelize';

class TicketsFile extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ticket: Sequelize.INTEGER,
        id_anexo: Sequelize.STRING,
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
      as: 'anexos',
    });
  }
}

export default TicketsFile;
