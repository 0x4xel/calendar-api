
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
const { Console } = require('winston/lib/winston/transports');
//const SequelizeController = require("../../db/SequelizeController");
const { Op } = require("sequelize");

async function buscarExamenController(req, res) {

  try {
    

    let examen = await buscarExamen(req.params);

    return sendResponse(res, 201, { ...examen }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}


async function crearExamenController(req, res) {
  try {

    // busco los % actuales del examen

    const { asignatura_id, evaluacion_id, descripcion, porcentaje, fecha } = req.body;

    const examenesAsignatura = await MySQL.Examen.findAll({
      where: {
        asignatura_id: asignatura_id
      },
    });

    for (let i = 0; i < examenesAsignatura.length; i++) {
      const examen = examenesAsignatura[i];
      if (examen.porcentaje + porcentaje > 100) {
        const err = new Error(ResponseMessages.errorPorcentajeMaximo);
        err.code = 404;
        throw err;
      }
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
     
    
    const {asignatura_id, evaluacion_id, descripcion, porcentaje, fecha } = req.body;
    const { id: id } = req.params;

    const examenesAsignatura = await MySQL.Examen.findAll({
      where: {
        asignatura_id: asignatura_id,
        id: {
          [Op.ne]: id 
        }
      },
    });

    for (let i = 0; i < examenesAsignatura.length; i++) {
      const examen = examenesAsignatura[i];
      if (examen.porcentaje + porcentaje > 100) {
        const err = new Error(ResponseMessages.errorPorcentajeMaximo);
        err.code = 404;
        throw err;
      }
    }

    const data = await modificarExamen(id, evaluacion_id, descripcion, porcentaje, fecha);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function eliminarExamenController(req, res) {
  try {
     

    const { id: id } = req.params;
    console.log(id);
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
