/* eslint-disable import/no-dynamic-require */
import { Sequelize } from 'sequelize';
import { User } from './example.js';
import sequelize from '../connections/sequelize.js';

const db = {};

db.User = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
