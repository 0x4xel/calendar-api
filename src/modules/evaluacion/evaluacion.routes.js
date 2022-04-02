const evaluacionRoutes = require('express').Router();
const {
  // controllers
  crearEvaluacionController,
  modificarEvaluacionController,
  eliminarEvaluacionController,
  getEvaluacionController,
} = require('./evaluacion.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CRUD 
evaluacionRoutes.post('/evaluacion/crear', isAuthenticated, crearEvaluacionController);
evaluacionRoutes.put('/evaluacion/modificar/:id', isAuthenticated, modificarEvaluacionController);
evaluacionRoutes.delete('/evaluacion/eliminar/:id', isAuthenticated, eliminarEvaluacionController);


evaluacionRoutes.get('/evaluacion', isAuthenticated, getEvaluacionController);

module.exports = evaluacionRoutes;
