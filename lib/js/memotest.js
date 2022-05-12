let rondas = 0;
let cajasRestantes = 12;
let $primerCuadro = null;
const $tablero = document.querySelector('.tablero');
const $cajas = $tablero.querySelectorAll('#cajas');

setearColores($cajas);

$tablero.onclick = function (e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('cajas') && !$elemento.classList.contains('completo')) {
        manejadorClickCaja($elemento);
    }
};

function setearColores($cajas) {
    const colores = ['rojo', 'azul', 'verde', 'violeta', 'amarillo', 'naranja'];
    const coloresRepetidos = colores.concat(colores);

    const coloresRandom = coloresRepetidos.sort(function () {
        return 0.5 - Math.random();
    });

    coloresRandom.forEach(function (color, i) {
        $cajas[i].classList.add(color);
    });
}

function mostrarColor($caja) {
    $caja.classList.remove('negro');
}

function manejadorClickCaja($caja) {
    mostrarColor($caja);

    if ($primerCuadro === null) {
        $primerCuadro = $caja;
        console.log($primerCuadro);
    } else {
        if ($primerCuadro === $caja) {
            return; //devuelve vacio en caso de ser literalmente la misma caja
        }

        rondas++;

        if ($primerCuadro.className === $caja.className) {
            eliminarCaja($primerCuadro);
            eliminarCaja($caja);
            $primerCuadro = null;
            cajasRestantes -= 2;
        } else {
            ocultarCaja($primerCuadro);
            ocultarCaja($caja);
            $primerCuadro = null;
        }
    }
}

function eliminarCaja($caja) {
    setTimeout(function () {
        $caja.classList.add('completo');
        // $caja.remove();
        evaluarFinDelJuego();
    }, 500);
}

function ocultarCaja($caja) {
    setTimeout(function () {
        $caja.classList.add('negro');
    }, 500);
}

function evaluarFinDelJuego() {
    if (cajasRestantes === 0) {
        $tablero.classList.add('oculto');
        const $felicitaciones = document.querySelector('#felicitaciones');
        $felicitaciones.classList.remove('oculto');
        $felicitaciones.firstElementChild.textContent = `${rondas} rondas`;
    }
}