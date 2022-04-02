
const { MySQL } = require('../db/index');

function getDiaRandom() {

	const diasHabiles = ["Lunes", "Martes", "miercoles", "jueves", "viernes"];
	const indice = Math.floor(Math.random() * (4 - 0 + 1) + 0);

	return diasHabiles[indice];
}

function getHoraRandom() {
	const horasHabiles = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
	return horasHabiles[Math.floor(Math.random() * (horasHabiles.length) + 0)];
}


async function crearHora() {
	let horarandom = getHoraRandom();
	const duracion = 90;
	const hora = await MySQL.Hora.create(
		{
			dia: getDiaRandom(),
			hora_inicio: horarandom + ":00:00",
			hora_fin: sumarHora(horarandom, duracion)
		}
	);
	return hora;
}

function sumarHora(hora, duracion) {
	const fecha = new Date(2016, 0, 2, hora, 0, 0);
	fecha.setHours(hora);
	fecha.setMinutes(fecha.getMinutes() + duracion);
	return fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()

}

module.exports = crearHora;


