import Sequelize, { Model } from 'sequelize';

class App extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        rota: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default App;
