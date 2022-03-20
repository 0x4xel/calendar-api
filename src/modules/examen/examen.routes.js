const examenRoutes = require('express').Router();
const {
  // controllers
  buscarExamenController,
  crearExamenController,
  modificarExamenController,
  eliminarExamenController,
  getExamenesAsignaturaController,
} = require('./examen.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD 
examenRoutes.get('/examen/buscar/:id', isAuthenticated,  buscarExamenController);
examenRoutes.post('/examen/crear', isAuthenticated, crearExamenController);
examenRoutes.put('/examen/modificar/:id', isAuthenticated, modificarExamenController);
examenRoutes.delete('/examen/eliminar/:id', isAuthenticated, eliminarExamenController);

//TODO Funciones alumno

examenRoutes.get('/examen/asignatura/:asignatura_id', isAuthenticated, getExamenesAsignaturaController);

module.exports = examenRoutes;
