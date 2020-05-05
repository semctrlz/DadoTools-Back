module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('encerramento_tickets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'set null',
        onUpdate: 'no action',
      },
      id_ticket: {
        type: Sequelize.INTEGER,
        references: { model: 'tickets', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      texto: {
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
    return queryInterface.dropTable('encerramento_tickets');
  },
};
