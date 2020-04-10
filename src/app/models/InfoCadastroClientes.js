import Sequelize, {Model} from 'sequelize';


class InfoCadastroClientes extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_cadastro: Sequelize.INTEGER,
        mensagem: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.CadastroClientes, {
      foreignKey: 'id_cadastro'
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_usuario'
    });

  }

}

export default InfoCadastroClientes;
