import Sequelize, { Model } from 'sequelize';

class TicketCategoriaAutoEncs extends Model {
  static init(sequelize) {
    super.init(
      {
        id_categoria: Sequelize.INTEGER,
        id_usuario: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CategoriaTickets, {
      foreignKey: 'id_categoria',
      as: 'encaminhamentos',
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'usuario_enc',
    });
  }
}

export default TicketCategoriaAutoEncs;
