import Sequelize, { Model } from 'sequelize';

class CigamCadastroStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        cadastrado: Sequelize.BOOLEAN,
        cod_cigam: Sequelize.STRING,
        json_info: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CadastroClientes, { foreignKey: 'id_cadastro', as: 'status_cigam' });
  }
}

export default CigamCadastroStatus;
