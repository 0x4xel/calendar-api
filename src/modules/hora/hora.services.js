const { MySQL } = require('../../db');

const ResponseMessages = require('../../constants/responseMessages');
const controlErrores = require('../../utils/ControlErrores');

async function buscarHora({ id }) {
  const res = await MySQL.Hora.findByPk({
    where: {
      id: id
    },
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

async function crearHora({ hora_inicio, hora_fin }) {

  const hora = await MySQL.Hora.create(
    {
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
    }
  );

  return { hora };
}

async function modificarHora(
  id, hora_inicio, hora_fin
) {

  const res = await MySQL.Hora.update({
    hora_inicio: hora_inicio,
    hora_fin: hora_fin,
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

async function eliminarHora(id) {
  console.log(id);
  const res = await MySQL.Hora.destroy({
    where: { id: id }
  })
 
  if (res != 1) {
    const err = new Error(ResponseMessages.errorBorrado);
    err.code = 404;
    throw err;
  }

  return {res};
}

async function getHoras() {
  const horas = await MySQL.Hora.findAll();
  return {horas};
}

module.exports = {
  buscarHora,
  crearHora,
  modificarHora,
  eliminarHora,
  getHoras
};
