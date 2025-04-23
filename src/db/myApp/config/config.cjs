const { appConfig, myAppConfig } = require('../../../common/config.js');

const commonConfig = {
  username: myAppConfig.dbUser,
  password: myAppConfig.dbPassword,
  database: myAppConfig.dbName,
  host: myAppConfig.dbHost,
  port: myAppConfig.dbPort,
  dialect: 'mysql',
  logging: !appConfig.isProd,
};

module.exports = {
  development: { ...commonConfig },
  local: { ...commonConfig },
  production: { ...commonConfig },
};
