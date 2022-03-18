const asignaturaHoraRouter = require('express').Router();
const {
  // controllers
  buscarAsignaturaHoraController,
  crearAsignaturaHoraController,
  eliminarAsignaturaHoraController,
  getAsignaturaHoraController
} = require('./asignaturaHora.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD 
asignaturaHoraRouter.get('/asignaturaHora/buscar/:id',isAuthenticated, buscarAsignaturaHoraController);
asignaturaHoraRouter.post('/asignaturaHora/crear',isAuthenticated, crearAsignaturaHoraController);
asignaturaHoraRouter.delete('/asignaturaHora/eliminar/:id',isAuthenticated, eliminarAsignaturaHoraController);

//TODO Funciones asignatura
asignaturaHoraRouter.get('/asignaturaHora', isAuthenticated, getAsignaturaHoraController);

module.exports = asignaturaHoraRouter;
