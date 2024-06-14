const { Router } = require('express');

const ExampleService = require('../services/example.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { createUserSchema, updateUserSchema, findUserSchema } = require('../schemas/example.schema.js');

const router = Router();
const service = new ExampleService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(findUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const { body } = req;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
)

router.patch('/:id',
  validatorHandler(findUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
