module.exports = (sequelize, Sequelize) => {
	const AsignaturaHora = sequelize.define("AsignaturaHora", {
		asignatura_id: {
			type: Sequelize.UUID
		},

		hora_id: {
			type: Sequelize.UUID
		},
		
		notas: {
			type: Sequelize.STRING
		}
	},
		{
			timestamps: false,
		}
	);

	return AsignaturaHora;
};