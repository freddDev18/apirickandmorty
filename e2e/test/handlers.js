/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: envFile, override: true });

const restHandlers = [

];

export default restHandlers;
