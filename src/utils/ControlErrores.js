const sendResponse = require('./sendResponse');
// const logger = require('./logger');

function controlErrores(res, error) {
  console.log('error', error);
  if (error.parent && error.parent.code === 'ER_DUP_ENTRY') {
    return sendResponse(res, 409, {}, 'Entrada duplicada');
  }
  if (error.code === 400) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 401) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 403) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 404) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  return sendResponse(res, 500, {}, 'Error 500. Algo salio mal');
}

module.exports = controlErrores;
