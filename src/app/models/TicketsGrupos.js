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
    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'criador_grupo',
    });
    this.hasMany(models.User, {
      foreignKey: 'id_grupo',
      as: 'componentes_grupo',
    });
  }
}

export default TicketsGrupos;
