import Sequelize, { Model } from 'sequelize';

class AvaliacaoTicket extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_ticket: Sequelize.INTEGER,
        nota: Sequelize.STRING,
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
      as: 'usuario_avaliador',
    });

    this.belongsTo(models.Ticket, {
      foreignKey: 'id_ticket',
      as: 'avaliacao',
    });
  }
}

export default AvaliacaoTicket;
