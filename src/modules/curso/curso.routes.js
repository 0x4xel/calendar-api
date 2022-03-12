const userRoutes = require('express').Router();
const {
  // controllers
  crearCursoController,
  eliminarCursoController,
  getCursosController,
} = require('./curso.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD //TODO AUTENTIFICACION
userRoutes.post('/curso/crear', crearCursoController);
userRoutes.delete('/curso/eliminar/:id', eliminarCursoController);

//TODO Funciones curso

userRoutes.get('/curso', getCursosController);

module.exports = userRoutes;
