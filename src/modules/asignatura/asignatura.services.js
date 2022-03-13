const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarAsignatura({ id }) {
  const res = await MySQL.Asignatura.findByPk(id);
 
  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    asignatura: res,
  };
 
}

async function crearAsignatura(nombre, curso_id) {
  const curso = await MySQL.Asignatura.create(
    {
      nombre: nombre,
      curso_id: curso_id
    }
  );
  return { curso };
}

async function eliminarAsignatura(id) {
  const res = await MySQL.Asignatura.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}

async function getAsignaturas() {
  const asignaturas = await MySQL.Asignatura.findAll();
  return {asignaturas};
}

async function getAsignaturasCurso(curso_id) {
  console.log(curso_id);
  const asignaturas = await MySQL.Asignatura.findAll({
    where: {
      curso_id: curso_id
    },
    include: {
       model: MySQL.Curso,
       attributes: ["nombre"]
    }
  });
  return {asignaturas};
}

module.exports = {
  buscarAsignatura,
  crearAsignatura,
  eliminarAsignatura,
  getAsignaturas,
  getAsignaturasCurso
};
