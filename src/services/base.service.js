import axios from 'axios';
import config from '../common/config.js';

class BaseService {
  constructor() {
    this.instance = axios.create({
      baseURL: config.urlBaseLegadoSustitucion,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
export default BaseService;
