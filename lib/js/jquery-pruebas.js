var _this = this;

// npm i --save-dev @types/jquery: save-dev son dependencias que no le llegan al usuario final
// @types hace referencia a typeScript

/// <reference types="jquery" />

// const $header = document.querySelector('h1'); === const $header = $('h1');
const $header = $('h1');
$header.text('prueba');

// const $elementos = document.querySelectorAll('#lista li); === const $elementos = $("#lista li");
const $elementos = $("#lista li");
$($elementos[2]).click();

//https://developer.mozilla.org/en-US/docs/Web/API/Console/table


/* $elementos.click( () => {
    console.log('Click en elemento');
}); */

// Arrow function, el THIS siempre es el objeto Window

$elementos.click(() => {
    console.log(`this en arrow function`);
    console.log(_this);
});

$elementos.click(function () {
    console.log(`this en funcion comun:`);
    console.log(this);
    console.log(`$(this) en funcion comun :`);
    console.log($(this));
    console.log(`$(this)[0] en funcion comun :`);
    console.log($(this)[0]);
});

//Chaining - concatenacion
$elementos.addClass("rojo").addClass("grande").css({ fontWeight: "bold" });

//Ejemplo implementacion Chaining
const miObjeto = {
    decirHola() {
        console.log("hola");
        return this; //Devuelve miObjeto nuevamente
    },
    decirChau() {
        console.log("chau");
        return this;
    }
};

// miObjeto.decirHola().decirHola().decirChau().decirHola().decirChau()


fetch("https://api.exchangeratesapi.io/latest").then(respuesta => respuesta.json()).then(respuesta => {
    $('h1').text(`Cambios del dia ${respuesta.date} en base ${respuesta.base}`);
    console.log(`Respuesta api: `, respuesta);
    $("#resultado").text($("#resultado").text() + JSON.stringify(respuesta));
    $('ul').html('');
    Object.keys(respuesta.rates).forEach(moneda => {
        $('ul').append($(`<li>${moneda}: ${respuesta.rates[moneda]}</li>`));
    });
}).catch(error => console.error("FALLO", error));

console.log(`Esto pasa antes que la respuesta del fetch`);

function verificarMayorDeEdad(edadUsuario) {
    return new Promise((resolve, reject) => {
        console.log(`Verificando en un proceso externo...`);

        setTimeout(() => {
            if (edadUsuario >= 18) {
                resolve('Es mayor de edad');
            } else {
                reject('Es menor de edad');
            }
        }, 500);
    });
}

const EDAD = 18;
verificarMayorDeEdad(18).then(mensaje => console.log(mensaje)).catch(mensaje => console.log(mensaje));