import Sequelize, { Model } from 'sequelize';

/*
ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      desc_conced: {
        type: Sequelize.DECIMAL(6, 4),
        allowNull: false,
      },
      marketing
*/

class SimuladorCenarios extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        publico: Sequelize.BOOLEAN,
        nome: Sequelize.STRING,
        ano: Sequelize.INTEGER,
        mes: Sequelize.INTEGER,
        desc_conced: Sequelize.DECIMAL(6, 4),
        marketing: Sequelize.DECIMAL(6, 4),
        somente_leitura: Sequelize.BOOLEAN,
        json: Sequelize.TEXT,
        historico_updates: Sequelize.TEXT,
        json_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            return JSON.parse(this.json ? this.json : '{}');
          },
        },
        historico_updates_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            return JSON.parse(
              this.historico_updates ? this.historico_updates : '{}'
            );
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
    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'cenarios_user',
    });
  }
}

export default SimuladorCenarios;
