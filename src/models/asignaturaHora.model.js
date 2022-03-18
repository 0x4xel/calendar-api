

module.exports = (sequelize, Sequelize) => {
	const AsignaturaHora = sequelize.define("AsignaturaHora", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		asignatura_id: {
			type: Sequelize.UUID,
			references: {
				model: "Asignatura",
				key: 'id'
			}
		
		},

		hora_id: {
			type: Sequelize.UUID,
			references: {
				model: "Hora",
				key: 'id'
			}
		},
	
	},
		{
			timestamps: false,
		}
	);

	return AsignaturaHora;
};