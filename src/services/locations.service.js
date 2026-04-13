/* eslint-disable class-methods-use-this */
const rmProvider = require('./providers/RickAndMorty.provider.js');
const { pagination } = require('../common/utils.js');

class LocationService {
  async getAllLocation(page = 1) {
    const dataAllLocation = await rmProvider.fetch('/location', { page });
    const mapResponseInfo = pagination(dataAllLocation.info);

    const formatDataLocation = [];
    (dataAllLocation.results).forEach((obj) => {
      const ids = obj.residents.map((url) => {
        const match = url.match(/\d+$/);
        return match ? match[0] : null;
      });
      const tempDataLocation = this.#mapLocation(obj, ids);
      formatDataLocation.push(tempDataLocation);
    });

    return {
      info: mapResponseInfo,
      results: formatDataLocation,
    };
  }

  async getLocationById(id) {
    const dataLocationById = await rmProvider.fetch(`/location/${id}`);

    const ids = dataLocationById.residents.map((url) => {
      const match = url.match(/\d+$/);
      return match ? match[0] : null;
    });

    const tempDataLocation = this.#mapLocation(dataLocationById, ids);
    return tempDataLocation;
  }

  #mapLocation(obj, ids) {
    const tempDataCharacter = {
      id: obj.id,
      nombre: obj.name,
      dimension: obj.dimension,
      residentes: ids,
      fechaCreacion: obj.created,
    };

    return tempDataCharacter;
  }
}
module.exports = LocationService;
