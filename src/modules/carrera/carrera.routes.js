const carreraRouter = require('express').Router();
const {
  // controllers
  crearCarreraController,
  eliminarCarreraController,
  getCarrerasController,
} = require('./carrera.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD 
carreraRouter.post('/carrera/crear', isAuthenticated, crearCarreraController);
carreraRouter.delete('/carrera/eliminar/:id',isAuthenticated, eliminarCarreraController);



carreraRouter.get('/carrera', getCarrerasController);

module.exports = carreraRouter;
