const examenalumnoRoutes = require('express').Router();
const {
  // controllers
  buscarExamenAlumnoController,
  crearExamenAlumnoController,
  modificarExamenAlumnoController,
  eliminarExamenAlumnoController,
  getExamenesAlumnoController,
} = require('./examenAlumno.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD
examenalumnoRoutes.get('/examenAlumno/buscar/:id', isAuthenticated,  buscarExamenAlumnoController);
examenalumnoRoutes.post('/examenAlumno/crear', isAuthenticated, crearExamenAlumnoController);
examenalumnoRoutes.put('/examenAlumno/modificar/:id', isAuthenticated, modificarExamenAlumnoController);
examenalumnoRoutes.delete('/examenAlumno/eliminar/:id', isAuthenticated, eliminarExamenAlumnoController);

//TODO Funciones asignatura

examenalumnoRoutes.get('/examenAlumno/:alumno_id', isAuthenticated, getExamenesAlumnoController);

module.exports = examenalumnoRoutes;
