import Sequelize, { Model } from 'sequelize';

class ConfigsMicroservicos extends Model {
  static init(sequelize) {
    super.init(
      {
        microservico: Sequelize.STRING,
        config: Sequelize.STRING,
        json: Sequelize.TEXT,
        json_obj: {
          type: Sequelize.VIRTUAL,
          get() {
            return JSON.parse(this.json ? this.json : '{}');
          },
        },
        created_by: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ConfigsMicroservicos;
