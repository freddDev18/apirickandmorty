const { Router } = require('express');
const CharacterService = require('../services/character.service.js');

const router = Router();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const character = new CharacterService();
      const { page } = req.query;
      const dataCharacter = await character.getAllCharacters(page);
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
      const character = new CharacterService();
      const { id } = req.params;
      console.log(`id personaje: ${id}`);

      const dataCharacter = await character.getCharacterById(id);
      // console.log(JSON.stringify(dataCharacter));
      res.json(dataCharacter);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:ids',
  async (req, res, next) => {
    try {
      const character = new CharacterService();
      const { ids } = req.params;
      console.log(`ids personajes: ${ids}`);

      const dataCharacters = await character.getMultipleCharacterss(ids);
      // console.log(JSON.stringify(dataCharacter));
      res.json(dataCharacters);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
