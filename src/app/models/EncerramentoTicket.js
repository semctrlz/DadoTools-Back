import Sequelize, { Model } from 'sequelize';

class EncerramentoTicket extends Model {
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
      as: 'criador_encerramento',
    });

    this.belongsTo(models.Ticket, {
      foreignKey: 'id_ticket',
      as: 'encerramentos',
    });
  }
}

export default EncerramentoTicket;
