const { Router } = require('express');
const { create } = require('../services/timezone.service.js');

const router = Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      const { body } = req;
      const newDates = await create(body);
      res.status(201).json(newDates);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
