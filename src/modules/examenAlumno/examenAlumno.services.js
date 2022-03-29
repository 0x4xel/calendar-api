const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');
const { Console } = require('winston/lib/winston/transports');

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
  console.log("Creo");
  console.log({ alumno_id, examen_id, nota });
  const examenAlumno = await MySQL.ExamenAlumno.create(
    {
      alumno_id: alumno_id,
      examen_id: examen_id,
      nota: nota,
    }
  );

  return { examenAlumno };
}

async function modificarExamenAlumno(id, nota) {
  console.log("modifico");
  console.log({ id, nota });
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

  return { res };
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

  return { res };
}


async function getExamenesAlumno(alumno_id) {
  const examenes = await MySQL.ExamenAlumno.findAll({
    where: {
      alumno_id: alumno_id
    },
    include: [MySQL.Examen, MySQL.Alumno]
  });

  return examenes;
}

async function getNotasAsignaturaAlumno(asignatura_id, alumno_id) {
  const examenAlumno = await MySQL.ExamenAlumno.findAll({
    where: {
      alumno_id: alumno_id
    },
  
    include: [{
      model: MySQL.Examen,
      where: {
        asignatura_id: asignatura_id,
      },
      include: {
        model: MySQL.Evaluacion
      },
      
    }, {
        model: MySQL.Alumno
      }
    ]
    


  });

  return {
    examenes: examenAlumno,
  };
}

async function getAlumnosExamenAsignatura(asignatura_id, examen_id) {
  console.log(asignatura_id);
  console.log(examen_id);

  const examenAlumno = await MySQL.sequelize.query(`SELECT nombre, primerApellido, segundoApellido,descripcion,examenalumnos.id,nota,alumnoasignatura.alumno_id,picture  from alumnoasignatura
  left join alumnos on (alumnoasignatura.alumno_id = alumnos.id)
  left join examens on (examens.asignatura_id = alumnoasignatura.asignatura_id  )
   left join examenalumnos on (examenalumnos.alumno_id = alumnos.id and examens.id = examenalumnos.examen_id)
  where alumnoasignatura.asignatura_id = ? and examens.id = ? 
  order by nombre,primerApellido,segundoApellido asc`, {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [asignatura_id, examen_id],
  });

  return {
    notas: examenAlumno,
  };
}

async function modificarExamenAlumnoMasivo(asignatura_id, examen_id, notas) {

  notas.forEach(async (nota) => {
    if (nota.id == "") {
      crearExamenAlumno({ alumno_id: nota.alumno_id, examen_id: examen_id, nota: nota.nota });
    } else {
      modificarExamenAlumno(nota.id, nota.nota);
    }
  });
  return { 1:1 };
}


module.exports = {
      buscarExamenAlumno,
      crearExamenAlumno,
      modificarExamenAlumno,
      eliminarExamenAlumno,
      getExamenesAlumno,
      getNotasAsignaturaAlumno,
      getAlumnosExamenAsignatura,
      modificarExamenAlumnoMasivo
    };
