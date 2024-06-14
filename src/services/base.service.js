const axios = require('axios');
const config = require('../common/config.js');

class BaseService {
  constructor() {
    this.instance = axios.create({
      baseURL: config.urlBaseLegadoSustitucion,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
module.exports = BaseService;
