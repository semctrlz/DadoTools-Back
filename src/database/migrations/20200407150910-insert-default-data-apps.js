module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('apps', [
      {
        nome: 'Cadastro de clientes',
        descricao: 'Cadastro integrado de clientes',
        rota: 'cadastros',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Tickets',
        descricao: 'Acompanhamento e criação de tickets',
        rota: 'tickets',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('apps', null, {});
  },
};
