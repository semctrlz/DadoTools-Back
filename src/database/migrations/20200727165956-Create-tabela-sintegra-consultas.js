module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sintegra_consultas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cadastro: {
        type: Sequelize.INTEGER,
        references: { model: 'cadastro_clientes', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action',
      },
      cnpj_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      retorno_json: {
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
    return queryInterface.dropTable('sintegra_consultas');
  },
};
