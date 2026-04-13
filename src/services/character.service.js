/* eslint-disable class-methods-use-this */
const rmProvider = require('./providers/RickAndMorty.provider.js');
const { pagination } = require('../common/utils.js');

class CharacterService {
  async getAllCharacters(page = 1) {
    const dataAllCharacters = await rmProvider.fetch('/character', { page });

    const mapResponseInfo = pagination(dataAllCharacters.info);

    const formatDataCaracter = [];
    (dataAllCharacters.results).forEach((obj) => {
      const ids = obj.episode.map((url) => {
        const match = url.match(/\d+$/);
        return match ? match[0] : null;
      });

      const tempDataCharacter = this.#mapCharacter(obj, ids);

      formatDataCaracter.push(tempDataCharacter);
    });

    return {
      info: mapResponseInfo,
      results: formatDataCaracter,
    };
  }

  async getCharacterById(id) {
    const dataCharacterById = await rmProvider.fetch(`/character/${id}`);

    const ids = dataCharacterById.episode.map((url) => {
      const match = url.match(/\d+$/);
      return match ? match[0] : null;
    });

    const tempDataCharacter = this.#mapCharacter(dataCharacterById, ids);

    return tempDataCharacter;
  }

  async getMultipleCharacters(ids) {
    const formattedIds = Array.isArray(ids) ? ids.join(',') : ids;
    const dataMultipleCharacter = await rmProvider.fetch(`/character/${formattedIds}`);

    return dataMultipleCharacter;
  }

  #mapCharacter(obj, ids) {
    const tempDataCharacter = {
      id: obj.id,
      nombre: obj.name,
      estado: obj.status,
      especie: obj.species,
      genero: obj.gender,
      foto: obj.image,
      origen: {
        nombre: obj.origin.name,
        enlace: obj.origin.url,
      },
      episodios: ids,
      fechaCreacion: obj.created,
    };

    return tempDataCharacter;
  }
}

module.exports = CharacterService;
