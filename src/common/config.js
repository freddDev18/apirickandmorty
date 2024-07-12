require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbRootPassword: process.env.DB_ROOT_PASSWORD,
  isProd: process.env.NODE_ENV === 'production',
};

module.exports = config
