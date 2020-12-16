import {obtenerMonedas, obtenerCambios} from './consumos.js';

import {
    configurarInputFecha,
    mostrarCambios,
    mostrarCartelActualizacion,
    mostrarListadoMonedas,
    obtenerFechaSeleccionada,
    obtenerMonedaSeleccionada
} from './ui.js'

//SOLID. S = Single Responsability Principle

async function actualizar(){
    mostrarCartelActualizacion();
    const cambios = await obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada());
    mostrarCambios(cambios);
}

async function inicializar(){
    mostrarListadoMonedas(await obtenerMonedas(), actualizar);
    configurarInputFecha(actualizar);
}

inicializar();
