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

	});
	return Curso;
};