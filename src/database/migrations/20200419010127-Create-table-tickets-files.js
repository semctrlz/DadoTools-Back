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

  down: (queryInterface) => {
    return queryInterface.dropTable('tickets_files');
  },
};
