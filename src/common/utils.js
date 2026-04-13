const gracefulShutdown = (server) => {
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server ExpressJS is closed');
    process.exit(0);
  });

  // Forzar cierre del server despues de 5 segundos
  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 5000);
};

const renameKeys = function renameKeysDeep(obj, keyMap) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => renameKeysDeep(item, keyMap));
  }

  const renamedObj = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = keyMap[key] || key;
      renamedObj[newKey] = renameKeysDeep(obj[key], keyMap);
    }
  }
  return renamedObj;
};

const pagination = function paginationData(dataAllCharactersInfo) {
  const mapResponseInfo = renameKeys(dataAllCharactersInfo, {
    count: 'totalRegistros',
    pages: 'numeroPaginas',
    next: 'siguiente',
    prev: 'anterior',
  });

  const numSiguiente = mapResponseInfo.siguiente != null ? (mapResponseInfo.siguiente).split('=')[1] : null;
  const numAnterior = mapResponseInfo.anterior != null ? (mapResponseInfo.anterior).split('=')[1] : null;

  mapResponseInfo.siguiente = numSiguiente != null ? `/api/v1/character?page=${numSiguiente}` : null;
  mapResponseInfo.anterior = numAnterior != null ? `/api/v1/character?page=${numAnterior}` : null;

  return mapResponseInfo;
};

module.exports = {
  gracefulShutdown, renameKeys, pagination,
};
