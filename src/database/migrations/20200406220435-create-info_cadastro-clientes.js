'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('info_cadastro_clientes', {
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
        onUpdate: 'no action'

        },
        id_usuario:{
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onDelete: 'set null',
          onUpdate: 'no action'
        },
        mensagem:{
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

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('info_cadastro_clientes');

  }
};
