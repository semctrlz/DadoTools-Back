'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        sobrenome: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(80),
          allowNull: false,
          unique: true,
        },
        codigo_cigam: {
          type: Sequelize.STRING(6),
          allowNull: true,
          defaultValue: ''
        },
        is_sales: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cargo: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        is_adm:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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

      return queryInterface.dropTable('users');

  }
};
