import Sequelize, { Model } from 'sequelize';

class TicketsUpdates extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_ticket: Sequelize.INTEGER,
        texto: Sequelize.STRING,
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
      as: 'criador_update',
    });

    this.belongsTo(models.Ticket, {
      foreignKey: 'id_ticket',
      as: 'updates',
    });

    this.hasOne(models.TicketsUpdatesFormatados, {
      foreignKey: 'id_ticket_update',
      as: 'update_formatado',
    });
    this.hasMany(models.TicketsUpdatesFile, {
      foreignKey: 'id_update',
      as: 'anexos_update',
    });
  }
}

export default TicketsUpdates;
