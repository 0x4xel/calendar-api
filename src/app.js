const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const resultado = dotenv.config();


if (resultado.error) {
  throw resultado.error;
}

// MODELOS Y CONSTANTES DE APP
const { MySQL } = require("./db");
const { PORT, HOST } = process.env; 
const { inicializarDatabase} = require("./db/import");

// creo la app
const app = express();
app.use(cors({ origin: "*" })); // Do this first
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas 
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Test',
  });
});


// Before cada peticion me muestra el log 
app.use(function (req, res, next) {
  console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
  console.log(req.params);
  console.log(req.body);
  return next();
});


// Sincronizacion de la base de datos
MySQL.sequelize
  .sync({ force: false})
  .then(() => {
    app.listen(PORT, HOST,() => console.info(`API corriendo bajo http://${HOST}:${PORT}`));
    // inicializarDatabase();
    console.info("Base de datos actualizada");
   
  }).then(() => {

  })
  .catch(err => console.log('error', err));


// CONTROLADOR DE RUTAS
app.use("/", require('./routes'));

module.exports = app;
