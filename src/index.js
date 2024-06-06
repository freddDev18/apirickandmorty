import createApp from './app.js';
import config from './common/config.js';
import gracefulShutdown from './common/utils.js';

const app = createApp();

const server = app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ExpressJS is listening on port http://${config.host}:${config.port}/`);
});

process.on('SIGTERM', () => gracefulShutdown(server));
process.on('SIGINT', () => gracefulShutdown(server));
