// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  buscarExamen,
  crearExamen,
  modificarExamen,
  eliminarExamen,
  getExamenesAsignatura
} = require('./examen.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');
const { MySQL } = require('../../db');
//const SequelizeController = require("../../db/SequelizeController");


async function buscarExamenController(req, res) {

  try {
    // const validationErr = validateCreateUserRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    let examen = await buscarExamen(req.params);

    return sendResponse(res, 201, { ...examen }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

//TODO CONTROLAR MAXIMO DE PORCENTAJE
async function crearExamenController(req, res) {
  try {
    // const validationErr = validateLoginRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    // busco los % actuales del examen
    const { asignatura_id, evaluacion_id, descripcion, porcentaje, fecha } = req.body;

    const examenesAsignatura = await MySQL.Examen.findAll({
      where: {
        asignatura_id: asignatura_id
      },
    });

    let totalPorcentaje = examenesAsignatura.reduce(function(valorAnterior, valorActual, indice, vector){
      return valorAnterior.porcentaje + valorActual.porcentaje;
    });

    totalPorcentaje = totalPorcentaje + porcentaje;

    if (totalPorcentaje > 100) {
      const err = new Error(ResponseMessages.errorPorcentajeMaximo);
      err.code = 404;
      throw err;
    }

    const data = await crearExamen({
      asignatura_id, evaluacion_id, descripcion, porcentaje, fecha
    });

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function modificarExamenController(req, res) {
  try {
    // const validationErr = validateChangeEmailRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { descripcion, porcentaje, fecha } = req.body;
    const { id: id } = req.params;


    const data = await modificarExamen(id, descripcion, porcentaje, fecha);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function eliminarExamenController(req, res) {
  try {
    // const validationErr = validateChangePasswordRequest(req);
    // if (validationErr) {
    //   return sendResponse(res, 422, {}, validationErr[0].msg);
    // }

    const { id: id } = req.params;

    const data = await eliminarExamen(id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getExamenesAsignaturaController(req, res) {
  try {
    const { asignatura_id: asignatura_id } = req.params;
    const data = await getExamenesAsignatura(asignatura_id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  buscarExamenController,
  crearExamenController,
  modificarExamenController,
  eliminarExamenController,
  getExamenesAsignaturaController,
};
