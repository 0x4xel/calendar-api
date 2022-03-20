module.exports = (sequelize, Sequelize) => {
	const Evaluacion = sequelize.define("Evaluacion", {
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
	return Evaluacion;
};