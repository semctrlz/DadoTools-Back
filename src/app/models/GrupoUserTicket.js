import Sequelize, { Model } from 'sequelize';

class GrupoUserTicket extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_grupo: Sequelize.INTEGER,
        nivel: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.TicketsGrupos, {
      foreignKey: 'id_grupo',
      as: 'componentes',
    });
    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'user_grupo',
    });
  }
}

export default GrupoUserTicket;
