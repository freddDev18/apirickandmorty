/* eslint-disable import/no-dynamic-require */
import { Sequelize } from 'sequelize';
import config from '../../common/config.js';
import { User } from './example.js';

const db = {};

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
});

db.User = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
