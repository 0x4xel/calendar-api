const alumnoRoutes = require('express').Router();
const {
  // controllers
  buscarAlumnoController,
  crearAlumnoController,
  modificarAlumnoController,
  eliminarAlumnoController,
  getAlumnosController,
} = require('./alumno.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD 
alumnoRoutes.get('/alumno/buscar/:id', isAuthenticated,  buscarAlumnoController);
alumnoRoutes.post('/alumno/crear', isAuthenticated, crearAlumnoController);
alumnoRoutes.put('/alumno/modificar/:id', isAuthenticated, modificarAlumnoController);
alumnoRoutes.delete('/alumno/eliminar/:id', isAuthenticated, eliminarAlumnoController);


alumnoRoutes.get('/userAlumnos/:id',isAuthenticated, getAlumnosController);

module.exports = alumnoRoutes;
