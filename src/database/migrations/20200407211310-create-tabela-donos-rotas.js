module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('responsabilidades', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      gerente_geral: {
        type: Sequelize.STRING(6),
        required: true,
      },
      gerente_comercial: {
        type: Sequelize.STRING(6),
        required: true,
      },
      supervisor: {
        type: Sequelize.STRING(6),
        required: true,
      },
      vendedor: {
        type: Sequelize.STRING(6),
        required: true,
      },
      cod_rota: {
        type: Sequelize.STRING(3),
        required: true,
      },
      nome_rota: {
        type: Sequelize.STRING(64),
        required: true,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('responsabilidades');
  },
};
