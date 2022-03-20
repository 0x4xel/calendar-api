module.exports = (sequelize, Sequelize) => {
	const Examen = sequelize.define("Examen", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		asignatura_id: {
			type: Sequelize.UUID,
		},

		evaluacion_id: {
			type: Sequelize.UUID
		},

		descripcion: {
			type:Sequelize.STRING
		},

		porcentaje: {
			type: Sequelize.INTEGER
		},
	},
	
	{
		timestamps: false,
	}
	);
	return Examen;
};