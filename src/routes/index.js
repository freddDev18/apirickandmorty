const { Router } = require('express');

const exampleRouter = require('./user.router.js');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  const health = (req, res) => { res.sendStatus(200); };

  router.get('/', health);
  router.use('/example', exampleRouter);
}

module.exports = routerApi;
