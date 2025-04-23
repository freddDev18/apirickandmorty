const dotenv = require('dotenv');
// Load the main .env file
dotenv.config({ path: '.env' });

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: '.env' });

// Load environment-specific .env file if it exists
const envFile = `.env.${env}`;

dotenv.config({ path: envFile, override: true });

const appConfig = {
  env,
  isProd: env === 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
};

module.exports = {
  appConfig,
};
