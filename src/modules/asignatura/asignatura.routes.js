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

// CD 
asignaturaRouter.get('/asignatura/buscar/:id',isAuthenticated, buscarAsignaturaController);
asignaturaRouter.post('/asignatura/crear',isAuthenticated, crearAsignaturaController);
asignaturaRouter.delete('/asignatura/eliminar/:id',isAuthenticated, eliminarAsignaturaController);

//TODO Funciones asignatura
asignaturaRouter.get('/asignatura', isAuthenticated, getAsignaturasController);
asignaturaRouter.get('/asignaturasCurso/:curso_id', isAuthenticated, getAsignaturasCursoController);

module.exports = asignaturaRouter;
