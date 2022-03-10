const express = require('express');
const requestValidator = require('express-validator');
const cors = require('cors');
const dotenv = require('dotenv');
const resultado = dotenv.config();


if (resultado.error) {
	throw resultado.error;
}

// Modelos
const { MySQL } = require("./db");
const { PORT } = process.env;	// puede que no sea necesario




// creo la app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.disable('x-powered-by');
app.use(requestValidator());


// Rutas 
app.get('/', (req, res) => {
	res.status(200).json({
		msg: 'Test',
	});
});


// Before cada peticion me muestra el log 
app.use(function(req, res, next) {
  console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
  return next();
});

MySQL.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.info(`App running at http://localhost:${PORT}`));
  })
  .catch(err => console.log('error', "entro en error" + err));

// app.use(allRoutes);
app.use("/", require('./routes'));

module.exports = app;
