const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');

//TODO FUNCION BUSCAR ALUMNO ASIGNATURA
async function buscarAlumnoAsignatura({ id }) {
  const res = await MySQL.AlumnoAsignatura.findByPk(id);

  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    asignaturaHora: res,
  };
}

async function crearAlumnoAsignatura(alumno_id, asignatura_id) {
  const asignatura = await MySQL.Asignatura.findByPk(asignatura_id);
  const alumno = await MySQL.Alumno.findByPk(alumno_id);

  if (!asignatura) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  if (!alumno) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  const alumnoAsignatura = await alumno.addAsignatura(asignatura);

  if (!alumnoAsignatura) {
    const err = new Error(ResponseMessages.errorCreacion);
    err.code = 404;
    throw err;
  }

  return { alumnoAsignatura };
}

async function eliminarAlumnoAsignatura(alumno_id, asignatura_id) {
  console.log(alumno_id, asignatura_id);
  const asignatura = await MySQL.Asignatura.findByPk(asignatura_id);
  const alumno = await MySQL.Alumno.findByPk(alumno_id);

  const res = await alumno.removeAsignatura(asignatura);

  if (!asignatura) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  if (!alumno) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return { res };
}

async function getAlumnosAsignatura(asignatura_id) {
console.log(asignatura_id);
  const asignaturasHoras = await MySQL.Asignatura.findAll({
    where: {id: asignatura_id },
    include: MySQL.Alumno,
  });
  return asignaturasHoras;
}

async function getAsignaturasAlumno(alumno_id) {
  const asignaturaAlumno = await MySQL.Alumno.findAll({
    where: {id: alumno_id },
    include: MySQL.Asignatura,
  });

  return asignaturaAlumno;
}




module.exports = {
  buscarAlumnoAsignatura,
  crearAlumnoAsignatura,
  eliminarAlumnoAsignatura,
  getAlumnosAsignatura,
  getAsignaturasAlumno
};
