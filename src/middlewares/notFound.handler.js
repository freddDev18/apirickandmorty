// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  res.status(404).json({
    code: 404,
    message: 'El recurso especificado no existe',
  });
}

export default notFoundHandler;
