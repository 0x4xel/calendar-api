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

async function crearAsignaturaHora(asignatura_id, hora_id, notas) {
  console.log({ asignatura_id, hora_id });
  const asignatura = await MySQL.Asignatura.findByPk(asignatura_id);

  if (!asignatura) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  const asignaturaHora = await asignatura.addHora(hora_id, {through: {notas: notas}});


  if (!asignaturaHora) {
    const err = new Error(ResponseMessages.errorCreacion);
    err.code = 404;
    throw err;
  }
  return { asignaturaHora };
}

//TODO modificar nota de la asignatura
async function modificarAsignaturaHora(asignatura_id, hora_id, notas) {
  const asignatura = await MySQL.Asignatura.findByPk(asignatura_id);

  if (!asignatura) {
    const err = new Error(ResponseMessages.errorBusqueda);
    err.code = 404;
    throw err;
  }

  const asignaturaHora = await MySQL.Asignatura.findOne({
    where: {id : asignatura_id},
    include: {
      model:  MySQL.Hora,
      where: {id:hora_id}
    }
  });
//  console.log(asignaturaHora);
 // console.log(asignaturaHora.Horas);
  //console.log(asignaturaHora.Horas[0].AsignaturaHora.notas);
  //console.log(asignaturaHora.Horas.AsignaturaHora);

  //asignaturaHora.Horas[0].AsignaturaHora.notas = notas;

  asignaturaHora.Horas[0].AsignaturaHora.notas = notas;
  
  const res = await asignatura.setHora(
    {
      asignatura_id: asignaturaHora.Horas[0].AsignaturaHora.asignatura_id,
      hora_id: asignaturaHora.Horas[0].AsignaturaHora.hora_id,
      notas:notas
    
    });
 // const res = await asignaturaHora.Horas[0].AsignaturaHora.save(); // This is a promise
  console.log(res);
  // console.log(asignaturaHora.Horas[0].AsignaturaHora.notas);

  if (!res) {
    const err = new Error(ResponseMessages.errorModificacion);
    err.code = 404;
    throw err;
  }
  return { res };
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
  modificarAsignaturaHora,
  eliminarAsignaturaHora,
  getAsignaturaHora,
  puedeCrearAsignaturaHora
};
