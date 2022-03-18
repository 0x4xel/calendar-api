const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');



async function buscarAsignaturaHora({ id }) {
  const res = await MySQL.AsignaturaHora.findByPk(id);

  if (!res) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  };

  return {
    asignaturaHora: res,
  };
}

async function crearAsignaturaHora(asignatura_id, hora_id) {
  console.log({ asignatura_id, hora_id });
  const asignatura = await MySQL.Asignatura.findByPk(asignatura_id);

  if (!asignatura) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  const asignaturaHora = await asignatura.addHora(hora_id);


  if (!asignaturaHora) {
    const err = new Error(ResponseMessages.errorCreacion);
    err.code = 404;
    throw err;
  }
  return { asignaturaHora };
}

async function eliminarAsignaturaHora(id) {
  const res = await MySQL.AsignaturaHora.destroy({
    where: { id: id }
  })

  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return { res };
}

async function getAsignaturaHora() {
  const asignaturasHoras = await MySQL.AsignaturaHora.findAll();
  return { asignaturasHoras };
}

async function puedeCrearAsignaturaHora(asignatura_id) {
  console.log(asignatura_id);
  const asignaturasHoras = await MySQL.Asignatura.findAll({
    where: {id: asignatura_id },
    include: MySQL.Hora,
  });

  console.log(asignaturasHoras[0].Horas.length);
  if (parseInt(asignaturasHoras[0].Horas.length) >= asignaturasHoras[0].horas_semana) {
    return false;
  }
  return true;
}


module.exports = {
  buscarAsignaturaHora,
  crearAsignaturaHora,
  eliminarAsignaturaHora,
  getAsignaturaHora,
  puedeCrearAsignaturaHora
};
