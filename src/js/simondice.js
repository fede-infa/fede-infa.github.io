let secuenciaUsuario = [];
let secuenciaMaquina = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = comenzarJuego;

actualizarEstado('Comenzá a jugar al Simon Dice ahora');
actualizarNumeroRonda('0');
bloquearInputUsuario();

function comenzarJuego(){
    reiniciarEstado();
    manejadorRondas();
}

function reiniciarEstado() {
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    ronda = 0;
}

function manejadorRondas() {
    actualizarEstado('Turno de la maquina');
    bloquearInputUsuario();

    const $nuevoCuadro = botonesAleatorios();
    secuenciaMaquina.push($nuevoCuadro);
    const TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000; //Permite indicar cuanto tiempo debe esperar el usuario para hacer inputs

    //Se tomara tantos segundos como elementos tenga el array secuenciaMaquina
    secuenciaMaquina.forEach(function ($boton, index) {
        const ms_delay = (index + 1) * 1000;
        setTimeout(function () {
            resaltar($boton);
        }, ms_delay);
    });

    setTimeout(function () {
        actualizarEstado('Turno del jugador');
        desbloquearInputUsuario();
    }, TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function manejadorInputUsuario(e) {
    const $boton = e.target;
    resaltar($boton);
    secuenciaUsuario.push($boton);

    const $botonMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    if ($boton.id !== $botonMaquina.id) {
        perder();
        return;
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearInputUsuario();
        setTimeout(manejadorRondas, 1000);
    }
}

function botonesAleatorios() {
    const $botones = document.querySelectorAll('.botonera');
    const indice = Math.floor(Math.random() * $botones.length);
    return $botones[indice];
}

function actualizarNumeroRonda(ronda) {
    document.querySelector('#ronda').textContent = ronda;
}

function actualizarEstado(estado, error = false){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    if (error){
        $estado.classList.remove('alert-info');
        $estado.classList.add('alert-danger');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-info');
    }
}

function resaltar($boton) {
    $boton.style.opacity = 1;
    setTimeout(function () {
        $boton.style.opacity = 0.5;
    }, 500);
}

function bloquearInputUsuario() {
    document.querySelectorAll('.botonera').forEach(function ($boton) {
        $boton.onclick = function () {};
    })
    // $cuadros.onclick = function(){};
}
        
function desbloquearInputUsuario(){
    document.querySelectorAll('.botonera').forEach(function ($boton){
        $boton.onclick = manejadorInputUsuario;
    });
    
}

function perder(){
    bloquearInputUsuario();
    actualizarEstado('Perdiste! Toca "Jugar" para empezar de nuevo', true);
}
