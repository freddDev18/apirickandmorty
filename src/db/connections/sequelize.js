const { Sequelize } = require('sequelize');
const config = require('../../common/config.js');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'postgres',
    // eslint-disable-next-line no-console
    logging: config.isProd ? false : console.log,
});

// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ force: true, match: /_test$/ });

module.exports = sequelize;
