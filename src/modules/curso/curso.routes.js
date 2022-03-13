const cursoRouter = require('express').Router();
const {
  // controllers
  crearCursoController,
  eliminarCursoController,
  getCursosController,
} = require('./curso.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD //TODO AUTENTIFICACION
cursoRouter.post('/curso/crear', crearCursoController);
cursoRouter.delete('/curso/eliminar/:id', eliminarCursoController);

//TODO Funciones curso

cursoRouter.get('/curso', getCursosController);

module.exports = cursoRouter;
