module.exports = (sequelize, Sequelize) => {
	const Asignatura = sequelize.define("Asignatura", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		nombre: {
			type: Sequelize.STRING
		},

		curso_id: {
			type: Sequelize.UUID
		},
		
		user_id: {
			type: Sequelize.UUID
		},

		horas_semana:{
			type: Sequelize.INTEGER                     
		}

	},
		{
			timestamps: false,
		}
	);

	return Asignatura;
};