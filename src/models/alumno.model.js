module.exports = (sequelize, Sequelize) => {
	const Alumno = sequelize.define("Alumno", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		nombre: {
			type: Sequelize.STRING
		},

		primerApellido: {
			type: Sequelize.STRING
		},

		segundoApellido: {
			type: Sequelize.STRING
		},
		
		picture: {
			type: Sequelize.STRING
		},

		carrera_id: {
			type: Sequelize.UUID
		},

	});
	return Alumno;
};