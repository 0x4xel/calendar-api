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

// CRUD //TODO AUTENTIFICACION
alumnoRoutes.get('/alumno/buscar/:id',  buscarAlumnoController);
alumnoRoutes.post('/alumno/crear', crearAlumnoController);
alumnoRoutes.put('/alumno/modificar/:id', modificarAlumnoController);
alumnoRoutes.delete('/alumno/eliminar/:id', eliminarAlumnoController);

//TODO Funciones alumno

alumnoRoutes.get('/alumno', getAlumnosController);

module.exports = alumnoRoutes;
