const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarAsignatura({ id }) {
  const res = await MySQL.Asignatura.findAll({
    where: {
      id: id
    },
    include: [ {
      model: MySQL.Curso,
      include : {
        model:  MySQL.Carrera
      }
    }, {
      model:MySQL.Hora,
    },
    {
      model:MySQL.Alumno,
    },
    {
      model:MySQL.Examen,
      include : {
        model:  MySQL.Evaluacion
      },
      
    } 
    ],
    order: [
      [MySQL.Examen, 'fecha', 'ASC'],
      [MySQL.Examen, 'porcentaje', 'DESC'],
      [MySQL.Examen, 'descripcion', 'ASC']
    ]
    
  }
  );
 
  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    asignatura: res,
  };
 
}

async function crearAsignatura(nombre, curso_id, user_id, horas_semana) {
  const curso = await MySQL.Asignatura.create(
    {
      nombre: nombre,
      curso_id: curso_id,
      user_id: user_id,
      horas_semana: horas_semana 
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
