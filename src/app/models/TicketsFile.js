import Sequelize, { Model } from 'sequelize';

class TicketsFile extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ticket: Sequelize.INTEGER,
        path: Sequelize.STRING,
        nome: Sequelize.STRING,
        tipo: Sequelize.STRING,
        tamanho: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.SITE}/files/${this.path}`;
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
    this.belongsTo(models.Ticket, {
      foreignKey: 'id_ticket',
      as: 'anexos',
    });
  }
}

export default TicketsFile;
