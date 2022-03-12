// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  crearCurso,
  eliminarCurso,
  getCursos
} = require('./curso.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function crearCursoController(req, res) {
  try {
    // const validationErr = validateLoginRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { nombre } = req.body;

    const data = await crearCurso(nombre);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}


async function eliminarCursoController(req, res) {
  try {
    // const validationErr = validateChangePasswordRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { id: id } = req.params;

    const data = await eliminarCurso(id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getCursosController(req, res) {
  try {
    const data = await getCursos();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  crearCursoController,
  eliminarCursoController,
  getCursosController,
};
