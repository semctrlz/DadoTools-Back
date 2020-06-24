module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grupo_user_tickets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      id_grupo: {
        type: Sequelize.INTEGER,
        references: { model: 'tickets_grupos', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default_value: 0,
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
    return queryInterface.dropTable('grupo_user_tickets');
  },
};
