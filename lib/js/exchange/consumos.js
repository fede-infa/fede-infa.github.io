
export function obtenerCambios(base = 'EUR', fecha = 'latest') {
    const BASE_URL = 'https://api.exchangeratesapi.io';
    return fetch(`${BASE_URL}/${fecha}?base=${base}`).then(response => response.json()).then(response => response.rates).catch(err => {
        console.error(err);
    });
}

export function obtenerMonedas() {
    //Obtengo el objeto response y le saco los keys y le agrego EUR porque la respuesta de la API nunca me devuelve la moneda base EURO
    return obtenerCambios().then(response => Object.keys(response).concat('EUR'));
}