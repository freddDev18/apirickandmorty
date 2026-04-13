const axios = require('axios');
const boom = require('@hapi/boom');

class RickAndMortyProvider {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://rickandmortyapi.com/api',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async fetch(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      const status = error.response?.status || 500;

      throw boom.badData(`Error ${status}: ${message}`);
    }
  }
}

module.exports = new RickAndMortyProvider();
