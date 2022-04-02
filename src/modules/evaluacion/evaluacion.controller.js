// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  crearEvaluacion,
  modificarEvaluacion,
  eliminarEvaluacion,
  getEvaluaciones
} = require('./evaluacion.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function crearEvaluacionController(req, res) {
  try {
    

    const { nombre } = req.body;
    const data = await crearEvaluacion({
      nombre
    });

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}

async function modificarEvaluacionController(req, res) {
  try {
     

    const { nombre } = req.body;
    const { id: id } = req.params;

  
    const data = await modificarEvaluacion(
      id,
      nombre,
    );
    
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function eliminarEvaluacionController(req, res) {
  try {
     

    const { id: id } = req.params;

    const data = await eliminarEvaluacion(
      id, 
    );
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getEvaluacionController(req, res) {
  try {
    const data = await getEvaluaciones();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  crearEvaluacionController,
  modificarEvaluacionController,
  eliminarEvaluacionController,
  getEvaluacionController,
};
