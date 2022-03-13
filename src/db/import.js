const { MySQL } = require('./index');

//TODO NO FUNCIONA IMPORTANCION INICIAL 
async function inicializarDatabase() {

	MySQL.Alumno.create(
		{
			nombre: "Elena",
			primerApellido: "Fernanadez",
			segundoApellido: "Martin",
			curso_id: ""
		},

		{
			nombre: "Eustaquio",
			primerApellido: "Perez",
			segundoApellido: "Gomez",
			curso_id: ""
		},

	);
}

module.exports = inicializarDatabase;