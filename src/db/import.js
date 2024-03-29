const { MySQL } = require('./index');
const { hashPayload, crearHora } = require('../utils');
const axios = require("axios");


async function inicializarDatabase() {

	const docente1 = await MySQL.User.create(
		{
			email: "axellodosa@gmail.com",
			password: await hashPayload("123qweASD"),
			nombre: "axel",
			primer_apellido: "Losantos",
			segundo_apellido: "Lizaso",
		}
	);

	const evaluacion1 = await MySQL.Evaluacion.create({ nombre: "Examen 1", });
	const evaluacion2 = await MySQL.Evaluacion.create({ nombre: "Foro", });
	const evaluacion3 = await MySQL.Evaluacion.create({ nombre: "Asistencia clases", });
	const evaluacion4 = await MySQL.Evaluacion.create({ nombre: "Trabajo 1", });


	const carrera = await MySQL.Carrera.create(
		{
			nombre: "Ingenieria informática",
		}
	);

	const alumno1 = await crearAlumnoRandom(carrera.id);
	const alumno2 = await crearAlumnoRandom(carrera.id);
	const alumno3 = await crearAlumnoRandom(carrera.id);
	const alumno4 = await crearAlumnoRandom(carrera.id);
	const alumno5 = await crearAlumnoRandom(carrera.id);
	const alumno6 = await crearAlumnoRandom(carrera.id);
	const alumno7 = await crearAlumnoRandom(carrera.id);
	const alumno8 = await crearAlumnoRandom(carrera.id);


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

	await alumno1.addAsignatura(asignatura1);
	await alumno1.addAsignatura(asignatura2);
	await alumno3.addAsignatura(asignatura2);
	await alumno5.addAsignatura(asignatura2);
	await alumno7.addAsignatura(asignatura1);
	await alumno4.addAsignatura(asignatura1);


	const hora1 = await crearHora();
	const hora2 = await crearHora();
	const hora3 = await crearHora();


	const asignaturaHora1 = await MySQL.AsignaturaHora.create(
		{
			asignatura_id: asignatura1.id,
			hora_id: hora1.id,
			notas: "Crear"
		}
	);

	const asignaturaHora2 = await MySQL.AsignaturaHora.create(
		{
			asignatura_id: asignatura2.id,
			hora_id: hora2.id,
			notas: "Crear"
		}
	);

	const asignaturaHora3 = await MySQL.AsignaturaHora.create(
		{
			asignatura_id: asignatura2.id,
			hora_id: hora1.id,
			notas: "Crear"
		}
	);



	const examen1 = await MySQL.Examen.create(
		{
			asignatura_id: asignatura1.id,
			evaluacion_id: evaluacion1.id,
			descripcion: "Examen parcial temas 1-4",
			porcentaje: 20,
			fecha: new Date()
		}
	);

	const examen2 = await MySQL.Examen.create(
		{
			asignatura_id: asignatura1.id,
			evaluacion_id: evaluacion2.id,
			descripcion: "Foro puntuable 1",
			porcentaje: 10,
			fecha: new Date()
		}
	);

	const examenAlumno = await MySQL.ExamenAlumno.create(
		{
			alumno_id: alumno1.id,
			examen_id: examen1.id,
			nota: 9
		}
	);

	const examenAlumno2 = await MySQL.ExamenAlumno.create(
		{
			alumno_id: alumno1.id,
			examen_id: examen2.id,
			nota: 2
		}
	);

	const examenAlumno3 = await MySQL.ExamenAlumno.create(
		{
			alumno_id: alumno2.id,
			examen_id: examen1.id,
			nota: 1
		}
	);

}


const crearAlumnoRandom = async (carrera_id) => {
	const url = "https://randomuser.me/api/?nat=es";
	let res = await axios.get(url);
	const persona = res.data.results[0];

	try {
		return await MySQL.Alumno.create(
			{
				nombre: persona.name.title,
				primerApellido: persona.name.first,
				segundoApellido: persona.name.last,
				picture: persona.picture.large,
				carrera_id: carrera_id
			});
	} catch (error) {
		console.log("no se ha podido generar el alumno" + error);
	}
}

module.exports = {
	inicializarDatabase,
};

