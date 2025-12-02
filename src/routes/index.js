const { Router } = require('express');

const usersRouter = require('./users.router.js');
const timezoneRouter = require('./timezon.router.js');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  const health = (req, res) => { res.sendStatus(200); };

  router.get('/', health);
  router.use('/users', usersRouter);
  router.use('/dates', timezoneRouter);
}

module.exports = routerApi;
