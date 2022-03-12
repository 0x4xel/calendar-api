const allRoutes = require('express').Router();
const userRoutes = require('../../modules/users/users.routes');
const alumnoRouter = require('../../modules/alumno/alumno.routes');


// Rutas de cada modelo. Se utilizará un handler de cada Ruta del modelo (CRUD)
allRoutes.use(userRoutes);

// allRoutes.use(examRouter);
// allRoutes.use(signatureRouter);
allRoutes.use(alumnoRouter);

module.exports = allRoutes;
