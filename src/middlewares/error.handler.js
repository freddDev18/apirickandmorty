const { ValidationError, DatabaseError } = require('sequelize');

// Middleware tipo error para loggear errores
function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  // Mostrar la bitacora de error del servidor para monitorear
  next(err);
}

// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  res.status(404).json({
    code: '404',
    message: 'Not found',
    description: 'El recurso especificado no existe',
  });
}

// Middleware tipo error debe tener los 4 parametros
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Aunque no se utilice next en el código, es obligatorio ponerlo
  res.status(500).json({
    // Indicar que el error es estatus 500 Internal Server Error
    code: '500',
    message: 'Internal Server Error', // Mostrar al cliente el mensaje de error
    description: err.message, // Mostrar info del error
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    // console.log(err);
    const { output } = err;
    res.status(output.statusCode).json({
      code: output.payload.statusCode.toString(),
      message: output.payload.error,
      description: output.payload.message,
    });
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      code: '409',
      message: 'Conflict',
      description: err.message,
    });
  } else {
    next(err);
  }
}

function dbErrorHandler(err, req, res, next) {
  if (err instanceof DatabaseError) {
    res.status(422).json({
      code: '422',
      message: 'Unprocessable Content',
      description: err.message,
    });
  } else {
    next(err);
  }
}

module.exports = {
  logErrors, notFoundHandler, errorHandler, boomErrorHandler, ormErrorHandler, dbErrorHandler,
};
