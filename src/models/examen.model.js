module.exports = (sequelize, Sequelize) => {
	const Examen = sequelize.define("Examen", {

		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			unique:true,
		},

		asignatura_id: {
			type: Sequelize.UUID,
			primaryKey: true,
		},

		evaluacion_id: {
			type: Sequelize.UUID,
			primaryKey: true,
		},

		descripcion: {
			type:Sequelize.STRING
		},

		porcentaje: {
			type: Sequelize.INTEGER
		},

		fecha: {
			type: Sequelize.DATE
		},
	},
	
	{
		timestamps: false,
	}
	);
	return Examen;
};