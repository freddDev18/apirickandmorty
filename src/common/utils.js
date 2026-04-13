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
  console.log(typeof obj);
  if (typeof obj !== 'object' || obj === null) {
    console.log('1');
    return obj;
  }

  if (Array.isArray(obj)) {
    console.log('2');
    return obj.map((item) => renameKeysDeep(item, keyMap));
  }

  const renamedObj = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      console.log(`key ${key}`);
      const newKey = keyMap[key] || key;
      renamedObj[newKey] = renameKeysDeep(obj[key], keyMap);
    }
  }
  console.log('3');
  return renamedObj;
};

module.exports = {
  gracefulShutdown, renameKeys,
};
