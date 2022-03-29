// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  buscarAlumno,
  crearAlumno,
  modificarAlumno,
  eliminarAlumno,
  getAlumnos
} = require('./alumno.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');
//const SequelizeController = require("../../db/SequelizeController");


async function buscarAlumnoController(req, res) {

  try {
    // const validationErr = validateCreateUserRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }
   
    let alumno = await buscarAlumno(req.params);

    return sendResponse(res, 201, { ...alumno }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function crearAlumnoController(req, res) {
  try {
    // const validationErr = validateLoginRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { nombre, primerApellido, segundoApellido, curso_id } = req.body;
    const data = await crearAlumno({
      nombre, primerApellido, segundoApellido,curso_id
    });

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}

async function modificarAlumnoController(req, res) {
  try {
    // const validationErr = validateChangeEmailRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { nombre, primerApellido, segundoApellido } = req.body;
    const { id: id } = req.params;

  
    const data = await modificarAlumno(
      id,
      nombre,
      primerApellido,
      segundoApellido,
    );
    
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function eliminarAlumnoController(req, res) {
  try {
    // const validationErr = validateChangePasswordRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { id: id } = req.params;

    const data = await eliminarAlumno(
      id, 
    );
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAlumnosController(req, res) {
  try {
    const { id: id } = req.params;
    const data = await getAlumnos(id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  buscarAlumnoController,
  crearAlumnoController,
  modificarAlumnoController,
  eliminarAlumnoController,
  getAlumnosController
};
