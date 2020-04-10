"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('formas_pagtos', [
      {
        cod_forma_pagto: '01',
        nome_forma_pagto: 'BOLETO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_forma_pagto: '02',
        nome_forma_pagto: 'DEPÓSITO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_forma_pagto: '03',
        nome_forma_pagto: 'DINHEIRO',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('formas_pagtos', null, {});
  }
};
