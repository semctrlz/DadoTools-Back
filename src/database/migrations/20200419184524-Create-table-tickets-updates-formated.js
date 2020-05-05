module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets_updates_formatados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_ticket_update: {
        type: Sequelize.INTEGER,
        references: { model: 'tickets_updates', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      texto_json: {
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
    return queryInterface.dropTable('tickets_updates_formatados');
  },
};
