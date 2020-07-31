import Sequelize, { Model } from 'sequelize';

class SintegraConsultas extends Model {
  static init(sequelize) {
    super.init(
      {
        id_cadastro: Sequelize.STRING,
        cnpj_cpf: Sequelize.INTEGER,
        retorno_json: Sequelize.TEXT,
        json_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.retorno_json) {
              return JSON.parse(this.retorno_json);
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
      as: 'constultaSintegra',
    });
  }
}

export default SintegraConsultas;
