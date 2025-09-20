const { ValidationError, DatabaseError, ConnectionRefusedError } = require('sequelize');
const { AxiosError } = require('axios');

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
  if (err instanceof ConnectionRefusedError) {
    res.status(503).json({
      code: '503',
      message: 'Service Unavailable',
      description: err.original.code,
    });
  } else {
    res.status(500).json({
      code: '500',
      message: 'Internal Server Error',
      description: err.message,
    });
  }
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
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
  }
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

function clientHttpErrorHandler(err, req, res, next) {
  if (err instanceof AxiosError) {
    const { response } = err;
    res.status(response.status).json({
      code: response.status.toString(),
      message: err.code,
      description: err.description,
    });
  } else {
    next(err);
  }
}

function schemaErrorHandler(err, req, res, next) {
  if (err.status === 400) {
    res.status(400).json({
      code: '400',
      message: 'Error de validación de contrato',
      description: err.message,
      details: err.errors,
    });
    return;
  }

  if (err.status === 500) {
    res.status(500).json({
      code: '500',
      message: 'Error de validación de contrato',
      description: err.message,
      details: err.errors,
    });
    return;
  }
  next(err);
}

module.exports = {
  logErrors,
  notFoundHandler,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
  clientHttpErrorHandler,
  schemaErrorHandler,
};
