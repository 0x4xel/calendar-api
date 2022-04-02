const cursoRouter = require('express').Router();
const {
  // controllers
  crearCursoController,
  eliminarCursoController,
  getCursosController,
  getCursosCarreraController
} = require('./curso.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// CD 
cursoRouter.post('/curso/crear', isAuthenticated, crearCursoController);
cursoRouter.delete('/curso/eliminar/:id',isAuthenticated,  eliminarCursoController);



cursoRouter.get('/curso', getCursosController);
cursoRouter.get('/cursosCarrera/:id', getCursosCarreraController);

module.exports = cursoRouter;
