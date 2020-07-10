module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets_updates_files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_update: {
        type: Sequelize.INTEGER,
        references: { model: 'tickets_updates', key: 'id' },
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
    return queryInterface.dropTable('tickets_updates_files');
  },
};
