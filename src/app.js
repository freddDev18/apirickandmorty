const express = require('express');
const { json } = require('express');
const routerApi = require('./routes/index.js');
const config = require('./common/config.js');
const {
  logErrors, notFoundHandler, errorHandler, boomErrorHandler, ormErrorHandler, dbErrorHandler,
} = require('./middlewares/error.handler.js');


const createApp = () => {
  const app = express();
  app.disable('x-powered-by');

  app.get('/', (req, res) => {
    res.send(`${config.env} Environment Server`);
  });

  app.use(json());
  routerApi(app);

  app.use(logErrors);
  app.use(notFoundHandler);
  app.use(ormErrorHandler);
  app.use(dbErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
