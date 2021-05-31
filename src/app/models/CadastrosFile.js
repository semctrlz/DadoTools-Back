import Sequelize, { Model } from 'sequelize';

class CadastrosFile extends Model {
  static init(sequelize) {
    super.init(
      {
        id_cadastro_clientes: Sequelize.INTEGER,
        id_anexo: Sequelize.STRING,
        nome: Sequelize.STRING,
        size: Sequelize.NUMBER,
        url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ticket, {
      foreignKey: 'id_cadastro_clientes',
      as: 'anexos',
    });
  }
}

export default CadastrosFile;
