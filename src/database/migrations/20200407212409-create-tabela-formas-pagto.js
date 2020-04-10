'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('formas_pagtos',{
      cod_forma_pagto:{
        type: Sequelize.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      nome_forma_pagto:{
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('formas_pagtos');

  }
};
