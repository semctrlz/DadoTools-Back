import Sequelize, { Model } from 'sequelize';

class AcessoMicroservicos extends Model {
  static init(sequelize) {
    super.init(
      {
        acessos: Sequelize.TEXT,
        acessos_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            return JSON.parse(this.acessos ? this.acessos : '{}');
          },
        },
        id_usuario: Sequelize.INTEGER,
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
      as: 'acesso_ms_user',
    });
  }
}

export default AcessoMicroservicos;
