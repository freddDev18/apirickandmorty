const express = require('express');
const { json } = require('express');
const os = require('os');
const routerApi = require('./routes/index.js');
const { appConfig } = require('./common/config.js');
const {
  logErrors, notFoundHandler, errorHandler, boomErrorHandler, ormErrorHandler, clientHttpErrorHandler, schemaErrorHandler,
} = require('./middlewares/error.handler.js');
const { openApiValidator } = require('./middlewares/openapi.handler.js');

const createApp = () => {
  const app = express();
  app.disable('x-powered-by');

  app.get('/', (req, res) => {
    res.json({
      environment: appConfig.env,
      containerId: os.hostname(),
    });
  });

  app.use(json());
  app.use(openApiValidator());
  routerApi(app);

  app.use(logErrors);
  app.use(notFoundHandler);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(clientHttpErrorHandler);
  app.use(schemaErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
