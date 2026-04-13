/* eslint-disable class-methods-use-this */
const rmProvider = require('./providers/RickAndMorty.provider.js');
const { renameKeys } = require('../common/utils.js');

class CharacterService {
  async getAllCharacters(page = 1) {
    // Aquí podrías aplicar lógica de negocio adicional
    const dataAllCharacters = await rmProvider.fetch('/character', { page });

    const mapResponseInfo = renameKeys(dataAllCharacters.info, {
      count: 'totalRegistros',
      pages: 'numeroPaginas',
      next: 'siguiente',
      prev: 'anterior',
    });

    const numSiguiente = mapResponseInfo.siguiente != null ? (mapResponseInfo.siguiente).split('=')[1] : null;
    const numAnterior = mapResponseInfo.anterior != null ? (mapResponseInfo.anterior).split('=')[1] : null;

    mapResponseInfo.siguiente = numSiguiente != null ? `/api/v1/character?page=${numSiguiente}` : null;
    mapResponseInfo.anterior = numAnterior != null ? `/api/v1/character?page=${numAnterior}` : null;

    // console.log(mapResponseInfo);
    const formatDataCaracter = [];
    (dataAllCharacters.results).forEach((obj) => {
      const ids = obj.episode.map((url) => {
        const match = url.match(/\d+$/);
        return match ? match[0] : null;
      });

      const tempDataCharacter = this.#mapCharacter(obj, ids);

      /*
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
      */

      formatDataCaracter.push(tempDataCharacter);
    });

    // console.log(formatDataCaracter);

    // proceso de maping de datos depersonajes

    // return dataAllCharacters;
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
    // ids puede ser un string "1,2,3" o un array [1,2,3]
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
