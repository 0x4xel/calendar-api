
const {
  buscarHora,
  crearHora,
  modificarHora,
  eliminarHora,
  getHoras
} = require('./hora.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');

async function buscarHoraController(req, res) {

  try {
    

    let hora = await buscarHora(req.params);

    return sendResponse(res, 201, { ...hora }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function crearHoraController(req, res) {
  try {
    

    const {dia, hora_inicio, hora_fin } = req.body;
   
    const data = await crearHora({
      dia, hora_inicio, hora_fin
    });

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function modificarHoraController(req, res) {
  try {
     

    const { hora_inicio, hora_fin } = req.body;
    const { id: id } = req.params;


    const data = await modificarAlumno(
      id,
      hora_inicio,
      hora_fin
    );

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoModifica);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function eliminarHoraController(req, res) {
  try {
     

    const { id: id } = req.params;

    const data = await eliminarHora(
      id,
    );
    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getHorasController(req, res) {
  try {
    const data = await getHoras();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  buscarHoraController,
  crearHoraController,
  modificarHoraController,
  eliminarHoraController,
  getHorasController,
};
