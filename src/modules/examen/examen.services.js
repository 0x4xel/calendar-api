const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarExamen({ id }) {
  console.log(id);
  const res = await MySQL.Examen.findAll({
    where: {
      id: id
    },
    include: [MySQL.Asignatura, MySQL.Evaluacion]
  });
 
  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    res: res,
  };
 
}

async function crearExamen({ asignatura_id, evaluacion_id, descripcion, porcentaje }) {

  const examen = await MySQL.Examen.create(
    {
      asignatura_id: asignatura_id,
      evaluacion_id: evaluacion_id,
      descripcion: descripcion,
      porcentaje: porcentaje
    }
  );

  return { examen };
}

async function modificarExamen(id, descripcion, porcentaje){

  const res = await MySQL.Examen.update({
    descripcion: descripcion,
    porcentaje: porcentaje,
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


async function eliminarExamen(id) {
  const res = await MySQL.Examen.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}


async function getExamenesAsignatura(asignatura_id) {
  const examenes = await MySQL.Asignatura.findAll({
    where: {
      id: asignatura_id
    },
    include: [ MySQL.Examen]
  });

  return examenes;
}

module.exports = {
  buscarExamen,
  crearExamen,
  modificarExamen,
  eliminarExamen,
  getExamenesAsignatura
};
