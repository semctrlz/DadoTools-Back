module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', {
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
      id_destinatario: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'set null',
        onUpdate: 'no action',
      },
      categoria: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      subcategoria: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      prioridade: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'N',
      },
      assunto: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      prazo: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      texto: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },

      // Aqui pode ser I = Inicial, F = fechado, E = excluídos
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'I',
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
    return queryInterface.dropTable('tickets');
  },
};
