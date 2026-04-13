const { Router } = require('express');

const LocationService = require('../services/locations.service.js');

const router = Router();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const character = new LocationService();
      const { page } = req.query;
      const dataCharacter = await character.getAllLocation(page);

      res.json(dataCharacter);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const character = new LocationService();
      const { id } = req.params;

      const dataCharacter = await character.getLocationById(id);
      res.json(dataCharacter);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
