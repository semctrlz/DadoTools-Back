module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('segmentos', [
      {
        cod_segmento: '14',
        nome_segmento: 'ATACADO',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cod_segmento: '13',
        nome_segmento: 'VAREJO',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('segmentos', null, {});
  },
};
