module.exports = (sequelize, Sequelize) => {
	const Curso = sequelize.define("Curso", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		nombre: {
			type: Sequelize.STRING
		},

		carrera_id : {
			type: Sequelize.UUID,
		}

	},
	{
		timestamps: false,
	}
);
	return Curso;
};