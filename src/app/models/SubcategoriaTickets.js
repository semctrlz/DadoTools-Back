import Sequelize, { Model } from 'sequelize';

class SubcategoriaTickets extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
        dias_prazo: Sequelize.NUMBER,
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
