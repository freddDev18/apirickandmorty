const { appConfig, usersConfig } = require('../../../common/config.js');

const commonConfig = {
  username: usersConfig.dbUser,
  password: usersConfig.dbPassword,
  database: usersConfig.dbName,
  host: usersConfig.dbHost,
  port: usersConfig.dbPort,
  dialect: 'mysql',
  logging: !appConfig.isProd,
};

module.exports = {
  development: { ...commonConfig },
  local: { ...commonConfig },
  production: { ...commonConfig },
};
