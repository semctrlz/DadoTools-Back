module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cadastros_files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cadastro_clientes: {
        type: Sequelize.INTEGER,
        references: { model: 'cadastro_clientes', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'cascade',
      },
      id_anexo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
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

  down: queryInterface => {
    return queryInterface.dropTable('cadastros_files');
  },
};
