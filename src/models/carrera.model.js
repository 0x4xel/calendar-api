module.exports = (sequelize, Sequelize) => {
	const Carrera = sequelize.define("Carrera", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		nombre: {
			type: Sequelize.STRING
		},

	},
	{
		timestamps: false,
	}
);
	return Carrera;
};