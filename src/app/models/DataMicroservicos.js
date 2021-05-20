import Sequelize, { Model } from 'sequelize';

export default class DataMicroservicos extends Model {
  static init(sequelize) {
    super.init(
      {
        microservico: Sequelize.STRING,
        data_from: Sequelize.STRING,
        date: Sequelize.STRING,
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
