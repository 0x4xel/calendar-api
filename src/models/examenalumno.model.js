module.exports = (sequelize, Sequelize) => {
	const ExamenAlumno = sequelize.define("ExamenAlumno", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			unique: true,
		},
		
		alumno_id: {
			type: Sequelize.UUID,
			primaryKey: true,
		},

		examen_id: {
			type: Sequelize.UUID,
			primaryKey: true,
		},

		nota: {
			type: Sequelize.INTEGER,
			max: 10,                  
      		min: 0,
			notEmpty: false,      
		},


	}, {
		timestamps: false,
	}
	);
	return ExamenAlumno;
};