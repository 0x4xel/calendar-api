// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  buscarAlumnoAsignatura,
  crearAlumnoAsignatura,
  eliminarAlumnoAsignatura,
  getAlumnosAsignatura,
  getAsignaturasAlumno,
  
} = require('./alumnoAsignatura.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function buscarAlumnoAsignaturaController(req, res) {
  try {
    // const validationErr = validateCreateUserRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    let asignatura = await buscarAlumnoAsignatura(req.params);

    return sendResponse(res, 201, { ...asignatura }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }

}

async function crearAlumnoAsignaturaController(req, res) {
  try {
    // const validationErr = validateLoginRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }
    const { alumno_id, asignatura_id } = req.body;

    const resultado = await crearAlumnoAsignatura(alumno_id, asignatura_id);
    
    return sendResponse(res, 200, { ...resultado }, ResponseMessages.exitoCreacion);
  } catch (err) {
    return controlErrores(res, err);
  }
}




async function eliminarAlumnoAsignaturaController(req, res) {
  try {
    // const validationErr = validateChangePasswordRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { alumno_id, asignatura_id } = req.body;
    const data = await eliminarAlumnoAsignatura(alumno_id, asignatura_id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAlumnosAsignaturaController(req, res) {
  try {
    const { asignatura_id: asignatura_id } = req.params;
    const data = await getAlumnosAsignatura(asignatura_id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturasAlumnoController(req, res) {
  try {
    const { alumno_id: alumno_id } = req.params;
    const data = await getAsignaturasAlumno(alumno_id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}





module.exports = {
  buscarAlumnoAsignaturaController,
  crearAlumnoAsignaturaController,
  eliminarAlumnoAsignaturaController,
  getAlumnosAsignaturaController,
  getAsignaturasAlumnoController,
  
};
