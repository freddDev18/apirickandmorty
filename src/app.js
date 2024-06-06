import express, { json } from 'express';
import routerApi from './routes/index.js';
import config from './common/config.js';
import { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js';
import notFoundHandler from './middlewares/notFound.handler.js';

const createApp = () => {
  const app = express();
  app.disable('x-powered-by');

  app.get('/', (req, res) => {
    res.send(`${config.env} Environment Server`);
  });

  app.use(json());
  routerApi(app);

  app.use(notFoundHandler);

  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
