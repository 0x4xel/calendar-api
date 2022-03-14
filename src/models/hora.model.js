module.exports = (sequelize, Sequelize) => {
	const Hora = sequelize.define("Hora", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		hora_inicio: {
			type: Sequelize.TIME
		},

		hora_fin: {
			type: Sequelize.TIME
		}
	});
	return Hora;
};