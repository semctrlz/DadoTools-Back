import Sequelize, { Model } from 'sequelize';

class TicketsGrupos extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.GrupoUserTicket, {
      foreignKey: 'id_grupo',
      as: 'componentes',
    });
  }
}

export default TicketsGrupos;
