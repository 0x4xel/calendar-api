const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarExamen({ id }) {
  const examen = await MySQL.Examen.findAll({
    where: {
      id: id,
    },
    include: [MySQL.Asignatura, MySQL.Evaluacion]
  });
 
  if (!examen) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    examen: examen,
  };
 
}

async function crearExamen({ asignatura_id, evaluacion_id, descripcion, porcentaje, fecha }) {

  const examen = await MySQL.Examen.create(
    {
      asignatura_id: asignatura_id,
      evaluacion_id: evaluacion_id,
      descripcion: descripcion,
      porcentaje: porcentaje,
      fecha: fecha
    }
  );

  return { examen };
}

async function modificarExamen(id, evaluacion_id, descripcion, porcentaje, fecha){

  const res = await MySQL.Examen.update({
    evaluacion_id: evaluacion_id,
    descripcion: descripcion,
    porcentaje: porcentaje,
    fecha: fecha
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
  console.log(id);
  console.log("encima");
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
    include : {
      model:  MySQL.Examen,
    },
    order: [
      [MySQL.Examen, 'fecha', 'DESC']
    ]
  
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
