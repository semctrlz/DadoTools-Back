module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cadastros_dados_consolidados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cadastro: {
        type: Sequelize.INTEGER,
        references: { model: 'cadastro_clientes', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      dados: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
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
    return queryInterface.dropTable('cadastros_dados_consolidados');
  },
};
