const dotenv = require('dotenv');
// Load the main .env file
dotenv.config({ path: '.env' });
const env = process.env.NODE_ENV || 'development';
// Load environment-specific .env file if it exists
const envFile = `.env.${env}`;

dotenv.config({ path: envFile, override: true });

const appConfig = {
  env,
  isProd: env === 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
};

const dbAppConfig = {
  dbHost: process.env.DB_HOST_APP,
  dbPort: process.env.DB_PORT_APP || 3306,
  dbName: process.env.DB_NAME_APP,
  dbUser: process.env.DB_USER_APP,
  dbPassword: process.env.DB_PASSWORD_APP,
};

module.exports = {
  appConfig,
  dbAppConfig,
};
