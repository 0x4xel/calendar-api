const userRoutes = require('express').Router();
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
userRoutes.get('/alumno/buscar/:id',  buscarAlumnoController);
userRoutes.post('/alumno/crear', crearAlumnoController);
userRoutes.put('/alumno/modificar/:id', modificarAlumnoController);
userRoutes.delete('/alumno/eliminar/:id', eliminarAlumnoController);

//TODO Funciones alumno

userRoutes.get('/alumno', getAlumnosController);

module.exports = userRoutes;
