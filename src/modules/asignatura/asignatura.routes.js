const asignaturaRouter = require('express').Router();
const {
  // controllers
  crearAsignaturaController,
  eliminarAsignaturaController,
  getAsignaturasController,
  buscarAsignaturaController,
  getAsignaturasCursoController
} = require('./asignatura.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD //TODO AUTENTIFICACION
asignaturaRouter.get('/asignatura/buscar/:id', buscarAsignaturaController);
asignaturaRouter.post('/asignatura/crear', crearAsignaturaController);
asignaturaRouter.delete('/asignatura/eliminar/:id', eliminarAsignaturaController);

//TODO Funciones asignatura
asignaturaRouter.get('/asignatura', getAsignaturasController);
asignaturaRouter.get('/asignaturasCurso/:curso_id', getAsignaturasCursoController);

module.exports = asignaturaRouter;
