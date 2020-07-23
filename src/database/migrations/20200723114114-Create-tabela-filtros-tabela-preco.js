module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('filtros_tabelas_precos', {
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
      json: {
        type: Sequelize.TEXT('long'),
        onUpdate: 'no action',
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
    return queryInterface.dropTable('filtros_tabelas_precos');
  },
};
