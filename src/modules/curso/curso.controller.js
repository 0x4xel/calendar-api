// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  crearCurso,
  eliminarCurso,
  getCursos,
  getCursosCarrera
} = require('./curso.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function crearCursoController(req, res) {
  try {
    

    const { nombre, carrera_id } = req.body;

    const data = await crearCurso(nombre,carrera_id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}


async function eliminarCursoController(req, res) {
  try {
     

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

async function getCursosCarreraController(req, res) {
  try {

    const { id: id } = req.params;
    const data = await getCursosCarrera(id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}


module.exports = {
  crearCursoController,
  eliminarCursoController,
  getCursosController,
  getCursosCarreraController
};
