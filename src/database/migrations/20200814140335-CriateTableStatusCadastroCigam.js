module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cigam_cadastro_statuses', {
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
        onUpdate: 'cascade',
      },
      cod_cigam:{
        type: Sequelize.STRING(6),
        allowNull: false,
        default: ''
      },
      cadastrado:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      json_info: {
        type: Sequelize.TEXT('long'),
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
    return queryInterface.dropTable('cigam_cadastro_statuses');
  }
};
