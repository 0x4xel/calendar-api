const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function crearCarrera(nombre) {

  const carrera = await MySQL.Carrera.create(
    {
      nombre: nombre,
    }
  );

  return { carrera };
}

async function eliminarCarrera(id) {
  const res = await MySQL.Carrera.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}

async function getCarreras() {
  const carreras = await MySQL.Carrera.findAll();
  return {carreras};
}

module.exports = {
  crearCarrera,
  eliminarCarrera,
  getCarreras
};
