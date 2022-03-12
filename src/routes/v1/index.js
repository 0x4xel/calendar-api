const allRoutes = require('express').Router();
const userRoutes = require('../../modules/users/users.routes');
const alumnoRouter = require('../../modules/alumno/alumno.routes');
const cursoRouter = require('../../modules/curso/curso.routes');


// Rutas de cada modelo. Se utilizará un handler de cada Ruta del modelo (CRUD)
allRoutes.use(userRoutes);

// allRoutes.use(examRouter);
// allRoutes.use(signatureRouter);
allRoutes.use(alumnoRouter);
allRoutes.use(cursoRouter);

module.exports = allRoutes;
