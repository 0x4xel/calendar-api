const Sequelize = require('sequelize');

const AlumnoModel = require("../models/alumno.model");
const AsignaturaModel = require('../models/asignatura.model');
const CursoModel = require("../models/curso.model");
const HoraModel = require("../models/hora.model");
const CarreraModel = require("../models/carrera.model");
const UserModel = require("../models/user.model");
//const AsignaturaHoraModel = require("../models/AsignaturaHora.model");

const db = {}; 	// Inicializo la base de datos

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  dialect: process.env.DB_DIALECT,
	  logging: process.env.DB_LOGGING !== true ? console.log("Logueado con exito") : false,
	  benchmark: true,
	  pool: {
		idle: process.env.DB_CONNECTION_IDLE,
	  },

	},
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;



User = UserModel(sequelize, Sequelize);
Alumno = AlumnoModel(sequelize, Sequelize);
Curso = CursoModel(sequelize, Sequelize);
Asignatura = AsignaturaModel(sequelize, Sequelize);
Hora = HoraModel(sequelize, Sequelize);
Carrera = CarreraModel(sequelize, Sequelize);
// AsignaturaHora = AsignaturaHoraModel(sequelize, Sequelize);

Alumno.belongsTo(Carrera, { foreignKey: 'carrera_id' });
Carrera.hasMany(Alumno, { foreignKey: 'carrera_id' } );

Curso.belongsTo(Carrera, { foreignKey: 'carrera_id' });
Carrera.hasMany(Curso, { foreignKey: 'carrera_id' } );

Asignatura.belongsTo(Curso, { foreignKey: 'curso_id' });
Curso.hasMany(Asignatura, { foreignKey: 'curso_id' } );

Asignatura.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Asignatura, { foreignKey: 'user_id' } );

Asignatura.belongsToMany(Hora, { through: "AsignaturaHora", foreignKey: 'asignatura_id' });
Hora.belongsToMany(Asignatura, { through: "AsignaturaHora", foreignKey: 'hora_id' });


db.User = User;
db.Alumno = Alumno;
db.Curso = Curso;
db.Asignatura = Asignatura;
db.Hora = Hora;
db.Carrera = Carrera;
//db.AsignaturaHora = AsignaturaHora;



module.exports = db;

  


