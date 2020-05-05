module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_apps', [
      {
        id_usuario: 1,
        id_app: 1,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 1,
        id_app: 2,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 2,
        id_app: 1,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_usuario: 2,
        id_app: 2,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_apps', null, {});
  },
};
