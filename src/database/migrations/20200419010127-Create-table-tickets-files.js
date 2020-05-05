module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets_files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_ticket: {
        type: Sequelize.INTEGER,
        references: { model: 'tickets', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      tamanho: {
        type: Sequelize.STRING(60),
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
    return queryInterface.dropTable('tickets_files');
  },
};
