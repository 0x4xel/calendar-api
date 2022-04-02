// const {
//  // validadores (no se si usarlos)


// } = require('./users.request.validators');
const {
  crearCarrera,
  eliminarCarrera,
  getCarreras
} = require('./carrera.services');

const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');


async function crearCarreraController(req, res) {
  try {
    

    const { nombre } = req.body;

    const data = await crearCarrera(nombre);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoCreacion);
  } catch (err) {
      return controlErrores(res, err);
  }
}


async function eliminarCarreraController(req, res) {
  try {
     
    console.log(req.params);
    console.log("hola");
    const { id: id } = req.params;
    
    const data = await eliminarCarrera(id);

    return sendResponse(res, 200, { ...data }, ResponseMessages.exitoBorrado);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getCarrerasController(req, res) {
  try {
    const data = await getCarreras();
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

module.exports = {
  crearCarreraController,
  eliminarCarreraController,
  getCarrerasController,
};
