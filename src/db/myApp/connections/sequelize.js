const { Sequelize } = require('sequelize');
const { myAppConfig, appConfig } = require('../../../common/config.js');

const options = {
  host: myAppConfig.dbHost,
  port: myAppConfig.dbPort,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true, // Convierte automáticamente DECIMAL a números
  },
  // eslint-disable-next-line no-console
  logging: appConfig.isProd ? false : console.log,
};

const sequelize = new Sequelize(
  myAppConfig.dbName,
  myAppConfig.dbUser,
  myAppConfig.dbPassword,
  options,
);

module.exports = sequelize;
