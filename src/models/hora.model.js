module.exports = (sequelize, Sequelize) => {
	const Hora = sequelize.define("Hora", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},

		hora_inicio: {
			type: Sequelize.DATE
		},

		hora_fin: {
			type: Sequelize.DATE
		}
	});
	return Hora;
};