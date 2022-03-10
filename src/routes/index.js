const allRoutes = require('express').Router();
const v1Routes = require('./v1');

// Main de las rutas. se dividen por modelos. En este caso solo se usara la API
allRoutes.use('/v1', v1Routes);

module.exports = allRoutes;