const allRoutes = require('express').Router();
const userRoutes = require('../../modules/users/users.routes');
const alumnoRouter = require('../../modules/alumno/alumno.routes');
const cursoRouter = require('../../modules/curso/curso.routes');
const asignaturaRouter = require('../../modules/asignatura/asignatura.routes');
const horaRouter = require('../../modules/hora/hora.routes');
const asignaturaHoraRouter = require('../../modules/asignaturaHora/asignaturaHora.routes');
const carreraRouter = require('../../modules/carrera/carrera.routes');
const alumnoAsignaturaRouter = require('../../modules/alumnoAsignatura/alumnoAsignatura.routes');
const evaluacionRoutes = require('../../modules/evaluacion/evaluacion.routes');


// Rutas de cada modelo. Se utilizará un handler de cada Ruta del modelo (CRUD)
allRoutes.use(userRoutes);

allRoutes.use(alumnoRouter);
allRoutes.use(cursoRouter);
allRoutes.use(asignaturaRouter);
allRoutes.use(horaRouter);
allRoutes.use(asignaturaHoraRouter);
allRoutes.use(carreraRouter);
allRoutes.use(alumnoAsignaturaRouter);
allRoutes.use(evaluacionRoutes);

module.exports = allRoutes;
