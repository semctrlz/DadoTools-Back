module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('data_microservicos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      microservico: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      data_from: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      json: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'set null',
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

  down: queryInterface => {
    return queryInterface.dropTable('data_microservicos');
  },
};
