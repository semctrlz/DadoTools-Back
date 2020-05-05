import Sequelize, { Model } from 'sequelize';

class TicketsUpdatesFile extends Model {
  static init(sequelize) {
    super.init(
      {
        id_update: Sequelize.INTEGER,
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
    this.belongsTo(models.TicketsUpdates, {
      foreignKey: 'id_update',
      as: 'anexos_update',
    });
  }
}

export default TicketsUpdatesFile;
