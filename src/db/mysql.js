const Sequelize = require('sequelize');

const db = {}; 	// Inicializo la base de datos
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  dialect: process.env.DB_DIALECT,
	  logging: false,
	  benchmark: true,
	  pool: {
		idle: process.env.DB_CONNECTION_IDLE,
	  },
	},
);


const Alumno = require("../models/alumno.model")(sequelize, Sequelize)
const Asignatura = require('../models/asignatura.model')(sequelize, Sequelize);
const Curso = require("../models/curso.model")(sequelize, Sequelize);
const Hora = require("../models/hora.model")(sequelize, Sequelize);
const Carrera = require("../models/carrera.model")(sequelize, Sequelize);
const User = require("../models/user.model")(sequelize, Sequelize);
const Evaluacion = require("../models/evaluacion.model")(sequelize, Sequelize);
const Examen = require("../models/examen.model")(sequelize, Sequelize);
const ExamenAlumno = require("../models/examenalumno.model")(sequelize, Sequelize);
const AsignaturaHora= require("../models/asignaturaHora.model")(sequelize, Sequelize);


Alumno.belongsTo(Carrera, { foreignKey: 'carrera_id' });	// alumno pertenece a una carrera
Carrera.hasMany(Alumno, { foreignKey: 'carrera_id' } );		// carrera puede tener muchos alumno

Curso.belongsTo(Carrera, { foreignKey: 'carrera_id' });
Carrera.hasMany(Curso, { foreignKey: 'carrera_id' } );

Asignatura.belongsTo(Curso, { foreignKey: 'curso_id' });
Curso.hasMany(Asignatura, { foreignKey: 'curso_id' } );

Asignatura.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Asignatura, { foreignKey: 'user_id' } );



AsignaturaHora.belongsTo(Asignatura, { foreignKey: 'asignatura_id' });
AsignaturaHora.belongsTo(Hora, { foreignKey: 'hora_id' });

Asignatura.hasMany(AsignaturaHora, { foreignKey: 'asignatura_id' } );
Hora.hasMany(AsignaturaHora, { foreignKey: 'hora_id' } );


Asignatura.belongsToMany(Alumno, { through: "AlumnoAsignatura", foreignKey: 'asignatura_id' });
Alumno.belongsToMany(Asignatura, { through: "AlumnoAsignatura", foreignKey: 'alumno_id' });


Examen.belongsTo(Evaluacion, { foreignKey: 'evaluacion_id' });
Examen.belongsTo(Asignatura, { foreignKey: 'asignatura_id' });

Evaluacion.hasMany(Examen, { foreignKey: 'evaluacion_id' } );
Asignatura.hasMany(Examen, { foreignKey: 'asignatura_id' } );


ExamenAlumno.belongsTo(Examen, { foreignKey: 'examen_id' });
ExamenAlumno.belongsTo(Alumno, { foreignKey: 'alumno_id' });

Examen.hasMany(ExamenAlumno, { foreignKey: 'examen_id' } );
Alumno.hasMany(ExamenAlumno, { foreignKey: 'alumno_id' } );



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Alumno = Alumno;
db.Curso = Curso;
db.Asignatura = Asignatura;
db.Hora = Hora;
db.Carrera = Carrera;
db.Evaluacion = Evaluacion;
db.Examen = Examen;
db.ExamenAlumno = ExamenAlumno;
db.AsignaturaHora = AsignaturaHora;



module.exports = db;

  


