const { ValidationError, DatabaseError } = require('sequelize');

// Middleware tipo error para loggear errores
function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  // Mostrar la bitacora de error del servidor para monitorear
  next(err);
}

// Middleware tipo error debe tener los 4 parametros
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Aunque no se utilice next en el código, es obligatorio ponerlo
  res.status(500).json({
    // Indicar que el error es estatus 500 Internal Server Error
    code: err.code,
    message: err.message, // Mostrar al cliente el mensaje de error
    // stack: err.stack, // Mostrar info del error
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({
      code: output.payload.statusCode,
      message: decodeURIComponent(escape(output.payload.message)),
    });
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof DatabaseError) {
    res.status(409).json({
      code: 409,
      message: err.message,
      errors: err.errors,
    });
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
