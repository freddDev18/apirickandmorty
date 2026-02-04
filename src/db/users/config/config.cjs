const { appConfig, dbAppConfig } = require('../../../common/config.js');

const commonConfig = {
  username: dbAppConfig.dbUser,
  password: dbAppConfig.dbPassword,
  database: dbAppConfig.dbName,
  host: dbAppConfig.dbHost,
  port: dbAppConfig.dbPort,
  dialect: 'mysql',
  logging: !appConfig.isProd,
};

module.exports = {
  development: { ...commonConfig },
  local: { ...commonConfig },
  production: { ...commonConfig },
};
