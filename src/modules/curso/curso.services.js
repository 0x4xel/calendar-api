const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function crearCurso(nombre) {

  const curso = await MySQL.Curso.create(
    {
      nombre: nombre,
    }
  );

  return { curso };
}

async function eliminarCurso(id) {
  const res = await MySQL.Curso.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}

async function getCursos() {
  const cursos = await MySQL.Curso.findAll();
  return {cursos};
}

module.exports = {
  crearCurso,
  eliminarCurso,
  getCursos
};
