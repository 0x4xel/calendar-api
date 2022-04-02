const examenalumnoRoutes = require('express').Router();
const {
  // controllers
  buscarExamenAlumnoController,
  crearExamenAlumnoController,
  modificarExamenAlumnoController,
  eliminarExamenAlumnoController,
  getExamenesAlumnoController,
  getNotasAsignaturaAlumnoController,
  getAlumnosExamenAsignaturaController,
  modificarExamenAlumnoMasivoController
} = require('./examenAlumno.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD
examenalumnoRoutes.get('/examenAlumno/buscar/:id', isAuthenticated,  buscarExamenAlumnoController);
examenalumnoRoutes.post('/examenAlumno/crear', isAuthenticated, crearExamenAlumnoController);
examenalumnoRoutes.put('/examenAlumno/modificar/:id', isAuthenticated, modificarExamenAlumnoController);
examenalumnoRoutes.put('/examenAlumno/modificarMasivo/:asignatura_id/:examen_id', isAuthenticated, modificarExamenAlumnoMasivoController);

examenalumnoRoutes.delete('/examenAlumno/eliminar/:id', isAuthenticated, eliminarExamenAlumnoController);



examenalumnoRoutes.get('/examenAlumno/:alumno_id', isAuthenticated, getExamenesAlumnoController);
examenalumnoRoutes.get('/examenAlumno/:asignatura_id/:alumno_id', isAuthenticated, getNotasAsignaturaAlumnoController);
examenalumnoRoutes.get('/examenAlumno/asignatura/:asignatura_id/:examen_id', isAuthenticated, getAlumnosExamenAsignaturaController);

module.exports = examenalumnoRoutes;
