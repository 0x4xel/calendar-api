const Sequelize = require('sequelize');



const db = {}; 	// Inicializo la base de datos

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	"",
	{
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  dialect: process.env.DB_DIALECT,
	  logging: process.env.DB_LOGGING !== true ? console.log("alo") : false,
	  benchmark: true,
	  pool: {
		max: process.env.DB_POOL_MAX,
		min: process.env.DB_POOL_MIN,
		idle: process.env.DB_CONNECTION_IDLE,
	  },
	  operatorsAliases: false, // to supress the deprecation warning
	},
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;


