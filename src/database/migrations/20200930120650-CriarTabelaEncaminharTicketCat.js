module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket_categoria_auto_encs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: { model: 'categoria_tickets', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull: true,
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
    return queryInterface.dropTable('ticket_categoria_auto_encs');
  },
};
