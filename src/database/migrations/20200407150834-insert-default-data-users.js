'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      nome: 'Vágner Lenon',
      sobrenome: 'Lima da Silva',
      email: 'vagner.lenon@gmail.com',
      codigo_cigam:'007015',
      is_sales: true,
      password_hash:'$2a$08$CaQ4PuuN/sAc7GIsJGJefOTXY9tFsiPTUsHCCqV8U3BOsCvegnb7a',
      cargo: 'Master',
      is_adm: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Vágner Lenon',
      sobrenome: 'Lima da Silva',
      email: 'vagner.lenon@dadobier.com.br',
      codigo_cigam:'',
      is_sales: true,
      password_hash:'$2a$08$CaQ4PuuN/sAc7GIsJGJefOTXY9tFsiPTUsHCCqV8U3BOsCvegnb7a',
      cargo: 'Master',
      is_adm: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
