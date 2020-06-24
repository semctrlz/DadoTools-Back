import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

class Raw extends Sequelize {}

export default new Raw(databaseConfig);
