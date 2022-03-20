const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');


async function crearEvaluacion({nombre}) {

  const evaluacion = await MySQL.Evaluacion.create(
    {
      nombre: nombre
    }
  );

  return { evaluacion };
}

async function modificarEvaluacion(id, nombre) {

  const res = await MySQL.Evaluacion.update({
    nombre: nombre,
  }, {
    where: { id: id}
  });

  if (res != 1) {
    const err = new Error(ResponseMessages.errorModificacion);
    err.code = 404;
    throw err;
  }

  return {res};
}


async function eliminarEvaluacion(id) {
  const res = await MySQL.Evaluacion.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}

async function getEvaluaciones() {
  const evaluaciones = await MySQL.Evaluacion.findAll();
  return {evaluaciones};
}

module.exports = {
  crearEvaluacion,
  modificarEvaluacion,
  eliminarEvaluacion,
  getEvaluaciones
};
