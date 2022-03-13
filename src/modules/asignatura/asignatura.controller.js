// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  buscarAsignatura,
  crearAsignatura,
  eliminarAsignatura,
  getAsignaturas,
  getAsignaturasCurso
} = require('./asignatura.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function buscarAsignaturaController(req, res) {
  try {
    // const validationErr = validateCreateUserRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }
   
    let asignatura = await buscarAsignatura(req.params);

    return sendResponse(res, 201, { ...asignatura }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }

}
async function crearAsignaturaController(req, res) {
  try {
    // const validationErr = validateLoginRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { nombre, curso_id } = req.body;

    const data = await crearAsignatura(nombre,curso_id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}


async function eliminarAsignaturaController(req, res) {
  try {
    // const validationErr = validateChangePasswordRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { id: id } = req.params;

    const data = await eliminarAsignatura(id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturasController(req, res) {
  try {
    const data = await getAsignaturas();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturasCursoController(req, res) {
  
  const { curso_id } = req.params;

  try {
    const data = await getAsignaturasCurso(curso_id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  crearAsignaturaController,
  eliminarAsignaturaController,
  getAsignaturasController,
  buscarAsignaturaController,
  getAsignaturasCursoController
};
