import Sequelize, { Model } from 'sequelize';

class TicketsEncaminhados extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_destinatario: Sequelize.INTEGER,
        id_ticket: Sequelize.INTEGER,
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
      as: 'encaminhados',
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'encaminhou',
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_destinatario',
      as: 'recebeu',
    });
  }
}

export default TicketsEncaminhados;
