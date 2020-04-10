'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('user_apps', {
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
        onUpdate: 'no action'

        },
        id_app:{
          type: Sequelize.INTEGER,
          references: { model: 'apps', key: 'id' },
          onDelete: 'cascade',
          onUpdate: 'no action'
        },
        is_admin:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default_value: 0
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },

      }
    );

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('user_apps');

  }
};

