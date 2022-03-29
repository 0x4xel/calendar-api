const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarAlumno({ id }) {
  const res = await MySQL.Alumno.findAll({
    where: {
      id: id
    },
    include: [{
      model: MySQL.Asignatura,
      include : {
        model:  MySQL.Curso
      },
    },
    {
      model: MySQL.ExamenAlumno,
      include : {
        model:  MySQL.Examen,
        include : {
          model:  MySQL.Evaluacion
        },
      },
      order: [
        [MySQL.Examen, 'fecha', 'ASC']
      ]
      
    },
    {
      model: MySQL.Carrera,
    }],
   
    
  });

  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    alumno: res,
  };

}

async function crearAlumno({ nombre, primerApellido, segundoApellido, curso_id }) {

  const alumno = await MySQL.Alumno.create(
    {
      nombre: nombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      curso_id: curso_id
    }
  );

  return { alumno };
}

async function modificarAlumno(
  id, nombre, primerApellido, segundoApellido,
) {

  const res = await MySQL.Alumno.update({
    nombre: nombre,
    primerApellido: primerApellido,
    segundoApellido: segundoApellido,
  }, {
    where: { id: id }
  });

  if (res != 1) {
    const err = new Error(ResponseMessages.errorModificacion);
    err.code = 404;
    throw err;
  }

  return { res };
}


async function eliminarAlumno(id) {
  console.log(id);
  const res = await MySQL.Alumno.destroy({
    where: { id: id }
  })

  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return { res };
}

async function getAlumnos(id) {
  const alumnos = await MySQL.Alumno.findAll( {
 
    include: [{
      model: MySQL.Asignatura,
      required: true,
      include : {
        model:  MySQL.User,
        required: true,
        where: { "id": id }
      },
    }],
  });


  return {
    alumnos: alumnos,
  };
  
}

module.exports = {
  buscarAlumno,
  crearAlumno,
  modificarAlumno,
  eliminarAlumno,
  getAlumnos
};
