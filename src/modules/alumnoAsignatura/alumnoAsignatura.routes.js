const alumnoAsignatura = require('express').Router();
const {
  // controllers
  buscarAlumnoAsignaturaController,
  crearAlumnoAsignaturaController,
  eliminarAlumnoAsignaturaController,
  getAlumnosAsignaturaController,
  getAsignaturasAlumnoController
} = require('./alumnoAsignatura.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD 
alumnoAsignatura.get('/alumnoAsignatura/buscar/:id',isAuthenticated, buscarAlumnoAsignaturaController);
alumnoAsignatura.post('/alumnoAsignatura/crear',isAuthenticated, crearAlumnoAsignaturaController);
alumnoAsignatura.delete('/alumnoAsignatura/eliminar',isAuthenticated, eliminarAlumnoAsignaturaController);

//TODO Funciones asignatura
alumnoAsignatura.get('/alumnoAsignatura/:asignatura_id', isAuthenticated, getAlumnosAsignaturaController);
alumnoAsignatura.get('/asignaturaAlumno/:alumno_id', isAuthenticated, getAsignaturasAlumnoController);

module.exports = alumnoAsignatura;
