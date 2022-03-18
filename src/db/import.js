const { MySQL } = require('./index');

async function inicializarDatabase() {
	const docente1 = await MySQL.User.create(
		{
			email: "axellodosa@gmail.com",
			password: "TodoCambiar",
			nombre: "axel",
			primer_apellido: "Losantos",
			segundo_apellido: "Lizaso",
		}
	);

	const carrera = await MySQL.Carrera.create(
		{
			nombre: "Ingenieria informática",
		}
	);


	const alumno1 = await MySQL.Alumno.create(
		{
			nombre: "Elena",
			primerApellido: "Fernanadez",
			segundoApellido: "Martin",
			carrera_id: carrera.id
		},
	);

	const alumno2 = await MySQL.Alumno.create(
		{
			nombre: "Eustaquio",
			primerApellido: "Perez",
			segundoApellido: "Gomez",
			carrera_id: carrera.id
		},
	);

	const curso1 = await MySQL.Curso.create(
		{
			nombre: "Primer curso",
			carrera_id: carrera.id
		},
	);

	const curso2 = await MySQL.Curso.create(
		{
			nombre: "Segundo curso",
			carrera_id: carrera.id
		},
	);

	const curso3 = await MySQL.Curso.create(
		{
			nombre: "Tercer curso",
			carrera_id: carrera.id
		},
	);


	const curso4 = await MySQL.Curso.create(
		{
			nombre: "Cuarto curso",
			carrera_id: carrera.id
		},
	);


	const asignatura1 = await MySQL.Asignatura.create(
		{
			nombre: "Matematicas I",
			curso_id: curso1.id,
			user_id: docente1.id,
			horas_semana: 3
		}
	);

	const asignatura2 = await MySQL.Asignatura.create(
		{
			nombre: "Fisica I",
			curso_id: curso1.id,
			user_id: docente1.id,
			horas_semana: 3
		}
	);




}

module.exports = {
	inicializarDatabase,
};

