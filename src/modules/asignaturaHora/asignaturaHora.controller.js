
const {
  buscarAsignaturaHora,
  crearAsignaturaHora,
  eliminarAsignaturaHora,
  getAsignaturaHora,
  puedeCrearAsignaturaHora,
  modificarAsignaturaHora
} = require('./asignaturaHora.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function buscarAsignaturaHoraController(req, res) {
  try {
    

    let asignatura = await buscarAsignaturaHora(req.params);

    return sendResponse(res, 201, { ...asignatura }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }

}

async function crearAsignaturaHoraController(req, res) {
  try {
    

    // tener en cuenta el numero maximo de asigntuas que se pueden crear en el horario
    const { asignatura_id, hora_id, notas } = req.body;

    const puede = await puedeCrearAsignaturaHora(asignatura_id);
    console.log(puede);
    if (!puede) {
      const err = new Error(ResponseMessages.errorMaximoAsignaturas);
      err.code = 404;
      throw err;
    }

    const resultado = await crearAsignaturaHora(asignatura_id, hora_id, notas);
    
    return sendResponse(res, 200, { ...resultado }, ResponseMessages.exitoCreacion);
  } catch (err) {
    return controlErrores(res, err);
  }
}


async function modificarAsignaturaHoraController(req, res) {
  try {
    

    // tener en cuenta el numero maximo de asigntuas que se pueden crear en el horario
    const { asignatura_id, hora_id, notas } = req.body;

    const resultado = await modificarAsignaturaHora(asignatura_id, hora_id, notas);
    
    return sendResponse(res, 200, { ...resultado }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}


async function eliminarAsignaturaHoraController(req, res) {
  try {
     

    const { id: id } = req.params;

    const data = await eliminarAsignaturaHora(id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturaHoraController(req, res) {
  try {
    const data = await getAsignaturaHora();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}


module.exports = {
  buscarAsignaturaHoraController,
  crearAsignaturaHoraController,
  modificarAsignaturaHoraController,
  eliminarAsignaturaHoraController,
  getAsignaturaHoraController,
  
};
