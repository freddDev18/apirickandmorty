const { Router } = require('express');

const exampleRouter = require('./example.router.js');

function routerApi(app) {
  const router = Router();

  app.use('/api', router);

  router.get('/', (req, res) => {
    res.sendStatus(200);
  });

  router.use('/v1/example', exampleRouter);
}

module.exports = routerApi;
