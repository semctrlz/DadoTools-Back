module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_apps', [
      {
        id_usuario: 1,
        id_app: 1,
        nivel: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 1,
        id_app: 2,
        nivel: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 2,
        id_app: 1,
        nivel: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 2,
        id_app: 2,
        nivel: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_apps', null, {});
  },
};
