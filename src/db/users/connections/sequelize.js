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
  // -06:00: Ignoring invalid timezone passed to Connection: America/Mexico_City.
  // This is currently a warning, but in future versions of MySQL2, an error will be thrown
  // if you pass an invalid configuration option to a Connection
  timezone: '-06:00',
};

const sequelize = new Sequelize(
  usersConfig.dbName,
  usersConfig.dbUser,
  usersConfig.dbPassword,
  options,
);

module.exports = sequelize;
