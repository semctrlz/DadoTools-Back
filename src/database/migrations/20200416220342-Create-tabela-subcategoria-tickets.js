module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subcategoria_tickets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: { model: 'categoria_tickets', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('subcategoria_tickets');
  },
};
