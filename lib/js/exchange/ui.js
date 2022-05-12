export function mostrarCambios(cambios) {
    const $cambios = document.querySelector('#cambio tbody');
    $cambios.innerHTML = '';
    Object.keys(cambios).sort().forEach(moneda => {
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

export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
    const $lista = document.createElement('div');
    $lista.className = 'list-group';

    monedas.sort().forEach(base => {
        const $item = document.createElement('a');
        $item.href = '#';
        $item.classList.add('list-group-item', 'list-group-item-action');
        $item.textContent = base;
        $item.dataset.base = base; // data-attributes: sirven para crear atributos que al navegador no importan y nos sirven para la aplicacion
        $item.addEventListener('click', () => {
            const $itemActivo = document.querySelector('.active');
            if ($itemActivo) {
                console.log('Item activo');
                $itemActivo.classList.remove('active');
            }
            $item.classList.add('active');

            callbackSeleccionMoneda(base);
        });
        $lista.appendChild($item);
    });

    document.querySelector('#monedas').appendChild($lista);
}

export function mostrarCartelActualizacion() {
    document.querySelector('#cambio tbody').innerHTML = "Cargando...";
}

export function obtenerFechaSeleccionada() {
    const fechaSeleccionada = document.querySelector('#fecha').value;
    return fechaSeleccionada || undefined; // si no hay nada seleccionado paso undefined ya que sino es un string vacio para forzar a que la funcion obtenerCambios use 'latest'
}

export function obtenerMonedaSeleccionada() {
    const $itemActivo = document.querySelector('.list-group-item.active');
    if ($itemActivo) {
        return $itemActivo.dataset.base;
    }
    return undefined;
}

export function configurarInputFecha(callbackSeleccionFecha) {
    const $fecha = document.querySelector('#fecha');
    const hoy = new Date().toISOString().split('T')[0];
    $fecha.setAttribute('max', hoy);
    $fecha.value = hoy;
    $fecha.addEventListener('change', callbackSeleccionFecha);
}