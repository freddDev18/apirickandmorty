/* eslint-disable import/no-dynamic-require */
const { Sequelize } = require('sequelize');
const { User } = require('./example.js');
const sequelize = require('../connections/sequelize.js');

const db = {};

db.User = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
