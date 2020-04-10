const credenciais = require('../credentials/database');

module.exports = {
dialect:  'mysql',
host: credenciais.host,
username: credenciais.username,
password: credenciais.senha,
database: credenciais.banco,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
  logging: false
};
