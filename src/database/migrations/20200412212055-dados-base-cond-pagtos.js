'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('condicoes_pagtos', [
      {
        cod_condicao_pagto: '40',
        nome_condicao_pagto: '10 DIAS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_condicao_pagto: '18',
        nome_condicao_pagto: '35 DIAS',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('condicoes_pagtos', null, {});
  }
};
