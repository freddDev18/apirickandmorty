const { Sequelize } = require('sequelize');
const { usersConfig, appConfig } = require('../../../common/config.js');

const options = {
  host: usersConfig.dbHost,
  port: usersConfig.dbPort,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true, // Convierte automáticamente DECIMAL a números
  },
  // eslint-disable-next-line no-console
  logging: appConfig.isProd ? false : console.log,
};

const sequelize = new Sequelize(
  usersConfig.dbName,
  usersConfig.dbUser,
  usersConfig.dbPassword,
  options,
);

module.exports = sequelize;
