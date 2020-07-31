import Sequelize, { Model } from 'sequelize';

class CadastrosDadosConsolidados extends Model {
  static init(sequelize) {
    super.init(
      {
        id_cadastro: Sequelize.STRING,
        dados: Sequelize.TEXT,
        dados_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.dados) {
              return JSON.parse(this.dados);
            }
            return {};
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
    this.belongsTo(models.CadastroClientes, {
      foreignKey: 'id',
      as: 'dadosConsolidados',
    });
  }
}

export default CadastrosDadosConsolidados;
