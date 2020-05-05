import Sequelize, { Model } from 'sequelize';

class SubcategoriaTickets extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.CategoriaTickets, {
      foreignKey: 'id',
      as: 'categoria',
    });
  }
}

export default SubcategoriaTickets;
