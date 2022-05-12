// Comando en comentario para reconocer objeto cy
/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/memo-test.html';
const NUMERO_CAJAS = 12;

before ( () => { 
    cy.visit(URL) // Indica a donde tiene que ir Cypress 
});

it ( 'Se asegura que haya un tablero con 12 cuadros', () => {
    cy.get('.tablero').find('.cajas').should('have.length', NUMERO_CAJAS);
});

it ( 'Se asegura que los cuadros sean aleatorios', () => {
    cy.get('.cajas').then( cajas => {
        let cajasOriginales = [];
        cajas.each( function (i, cuadro) {
            cajasOriginales.push(cuadro.className);
        });
        cy.visit(URL);

        let cajasNuevas = [];
        cy.get('.cajas').then ( nuevasCajas => {
            nuevasCajas.each( function (i, caja){
                cajasNuevas.push(caja.className);
            });
            cy.wrap(cajasOriginales).should('not.deep.equal', cajasNuevas)
        });
    });
});

describe('Resuelve el juego', () => {
    let mapaDePares, listaDePares;
    it('Eligue una combinacion erronea', () => {
        cy.get('.cajas').then( cajas => {
            mapaDePares = obtenerParesDeCajas(cajas); // Me devuelve un objeto
            listaDePares = Object.values(mapaDePares); //Convierte al objeto en un array (en este caso una matriz de 2 dimensiones, debido a que tengo la misma key por pares)
            listaDePares[0][0].click();
            listaDePares[3][1].click();
            
            cy.get('.cajas').should('have.length', NUMERO_CAJAS);

        });
    });

    it('Resuelve el juego', () => {
        cy.get('.cajas').should('have.length', NUMERO_CAJAS);
        console.log(mapaDePares);
        console.log(listaDePares);
        listaDePares.forEach( (par) => {
            cy.get(par[0]).click();
            cy.get(par[1]).click();
        });
    });
});

function obtenerParesDeCajas(cajas){
    const pares = {};

    cajas.each( (i, caja) => {
        const claseColor = caja.className.replace('col cajas m-1 negro ', '');

        if(pares[claseColor]) {
            pares[claseColor].push(caja);
        } else {
            pares[claseColor] = [caja]
        }
    });

    console.log(pares);
    return pares
}
