import Sequelize, { Model } from 'sequelize';

class CategoriaTickets extends Model {
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
    this.hasMany(models.SubcategoriaTickets, {
      foreignKey: 'id_categoria',
      as: 'subcategorias',
    });
  }
}

export default CategoriaTickets;
