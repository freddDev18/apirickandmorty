const { Sequelize } = require('sequelize');
const config = require('../../common/config.js');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
    // eslint-disable-next-line no-console
    logging: config.isProd ? false : console.log,
});

module.exports = sequelize;
