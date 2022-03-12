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

	});
	return Alumno;
};