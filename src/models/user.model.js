module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		email: {
			type: Sequelize.STRING
		}, 
		
		password: {
			type: Sequelize.STRING
		},

		nombre: {
			type: Sequelize.STRING
		},

		primer_apellido: {
			type: Sequelize.STRING
		},

		segundo_apellido: {
			type: Sequelize.STRING
		},

	});
	return User;
};