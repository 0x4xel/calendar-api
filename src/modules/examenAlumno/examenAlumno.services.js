const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarExamenAlumno({ id }) {

  const res = await MySQL.ExamenAlumno.findAll({
    where: {
      id: id,
    },
    include: [MySQL.Examen, MySQL.Alumno]
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

async function crearExamenAlumno({ alumno_id, examen_id, nota }) {

  const examenAlumno = await MySQL.ExamenAlumno.create(
    {
      alumno_id: alumno_id,
      examen_id: examen_id,
      nota: nota,
    }
  );

  return { examenAlumno };
}

async function modificarExamenAlumno( id, nota){

  const res = await MySQL.ExamenAlumno.update({
    nota: nota,
  }, {
    where: { id: id }
  });

  if (res != 1) {
    const err = new Error(ResponseMessages.errorModificacion);
    err.code = 404;
    throw err;
  }

  return {res};
}


async function eliminarExamenAlumno(id) {
  const res = await MySQL.ExamenAlumno.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}


async function getExamenesAlumno(alumno_id) {
  const examenes = await MySQL.ExamenAlumno.findAll({
    where: {
      alumno_id: alumno_id
    },
    include: [ MySQL.Examen, MySQL.Alumno]
  });

  return examenes;
}

module.exports = {
  buscarExamenAlumno,
  crearExamenAlumno,
  modificarExamenAlumno,
  eliminarExamenAlumno,
  getExamenesAlumno
};
