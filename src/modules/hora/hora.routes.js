const horaRoutes = require('express').Router();
const {
  // controllers
  buscarHoraController,
  crearHoraController,
  modificarHoraController,
  eliminarHoraController,
  getHorasController,
} = require('./hora.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD //TODO AUTENTIFICACION
horaRoutes.get('/hora/buscar/:id', isAuthenticated, buscarHoraController);
horaRoutes.post('/hora/crear', isAuthenticated, crearHoraController);
horaRoutes.put('/hora/modificar/:id', isAuthenticated, modificarHoraController);
horaRoutes.delete('/hora/eliminar/:id', isAuthenticated, eliminarHoraController);

//TODO Funciones alumno

horaRoutes.get('/hora', getHorasController);

module.exports = horaRoutes;
