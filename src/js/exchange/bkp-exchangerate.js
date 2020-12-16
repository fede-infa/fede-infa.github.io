
function obtenerCambios(base = 'EUR', fecha = 'latest'){
    const BASE_URL = 'https://api.exchangeratesapi.io';
    return fetch(`${BASE_URL}/${fecha}?base=${base}`)
        .then( (response) => response.json())
        .then( (response) => response.rates)
        .catch(err => {
        console.error(err);
        });
}

function obtenerMonedas(){
    //Obtengo el objeto response y le saco los keys y le agrego EUR porque la respuesta de la API nunca me devuelve la moneda base EURO
    return obtenerCambios().then( (response) => Object.keys(response).concat('EUR')); 
}

function mostrarCambios(cambios){
    const $cambios = document.querySelector('#cambio tbody');
    $cambios.innerHTML = '';
    Object.keys(cambios).sort().forEach( (moneda) => {
        const $fila = document.createElement('tr');
        const $moneda = document.createElement('td');
        const $cambio = document.createElement('td');
        $moneda.textContent = moneda;
        $cambio.textContent = cambios[moneda];
        $fila.appendChild($moneda);
        $fila.appendChild($cambio);
        $cambios.appendChild($fila);
    });
}

function mostrarListadoMonedas(monedas){
    const $lista = document.createElement('div');
    $lista.className = 'list-group';

    monedas.sort().forEach( (base) => {
        const $item = document.createElement('a');
        $item.href = '#';
        $item.classList.add('list-group-item', 'list-group-item-action');
        $item.textContent = base;
        $item.dataset.base = base; // data-attributes: sirven para crear atributos que al navegador no importan y nos sirven para la aplicacion
        $item.addEventListener('click', () => {
            const $itemActivo = document.querySelector('.active');
            if ($itemActivo){
                console.log('Item activo');
                $itemActivo.classList.remove('active');
            }
            $item.classList.add('active');
            actualizar()
        });
        $lista.appendChild($item);
    });

    document.querySelector('#monedas').appendChild($lista);

}

function mostrarCartelActualizacion(){
    document.querySelector('#cambio tbody').innerHTML = "Cargando...";
}

function obtenerFechaSeleccionada(){
    const fechaSeleccionada = document.querySelector('#fecha').value;
    return fechaSeleccionada|| undefined; // si no hay nada seleccionado paso undefined ya que sino es un string vacio para forzar a que la funcion obtenerCambios use 'latest'
}
 
function actualizar(){
    mostrarCartelActualizacion();
    obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada())
        .then( (cambios) => {
            mostrarCambios(cambios);
        });
}

function obtenerMonedaSeleccionada(){
    const $itemActivo = document.querySelector('.list-group-item.active');
    if ($itemActivo){
        return $itemActivo.dataset.base;
    }
    return undefined;
}

function configurarInputFecha(){
    const $fecha = document.querySelector('#fecha');
    const hoy = (new Date()).toISOString().split('T')[0];
    $fecha.setAttribute('max', hoy);
    $fecha.addEventListener('change', actualizar);
}

function inicializar(){
    obtenerMonedas().then((monedas) => {
        mostrarListadoMonedas(monedas);
    })

    configurarInputFecha();
}

inicializar();
