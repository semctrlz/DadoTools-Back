module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('simulador_cenarios', {
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
        onUpdate: 'cascade',
        allowNull: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      desc_conced: {
        type: Sequelize.DECIMAL(6, 4),
        allowNull: false,
      },
      marketing: {
        type: Sequelize.DECIMAL(6, 4),
        allowNull: false,
      },
      publico: {
        type: Sequelize.BOOLEAN,
        default: true,
        allowNull: false,
      },
      somente_leitura: {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false,
      },
      json: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      historico_updates: {
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

  down: queryInterface => {
    return queryInterface.dropTable('simulador_cenarios');
  },
};
