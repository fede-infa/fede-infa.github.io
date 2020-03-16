/// <reference types="jquery" />

// const ALL_POKEMONS = {};
// let url = 'https://pokeapi.co/api/v2/pokemon';
// let nextUrl = null;

let nextUrl = '';
let previousUrl = '';
let pokemonUrl = '';

const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
const $pokeList = document.querySelector('.pokemon-list');

/* const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    id: ''
}

const {url, type, id} = apiData; */
let apiUrl = 'https://pokeapi.co/api/v2/pokemon';

// https: //pokeapi.co/api/v2/pokemon

async function requestApi(apiURL){
    fetch(apiURL)
    .then( response => response.json() )
    .then( response => {
        nextUrl = response.next;
        previousUrl = response.previous;
        return response;
    } )
    .then( response => {
        response.results.forEach( pokemon => {
            generarPokemones(pokemon);
        })
    });
} 

function generarPokemones(pokemon) {
    let pokemonUrl = pokemon.url // Me guardo la url de cada pokemon en esta variable.
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(function (pokemon) {
            getPokemon(pokemon);
        })
}

function getPokemon(pokemon) {
    let allPokemonsContainer = document.querySelector('#pokelist');
    let pokeContainer = document.createElement("div")
    pokeContainer.classList.add('col-2','card');

    createPokemonImage(pokemon.id, pokeContainer);

    let pokeName = document.createElement('h4')
    pokeName.innerText = `#${pokemon.id} - ${pokemon.name}`

    let pokeTypes = document.createElement('ul')

    getPokemonTypes(pokemon.types, pokeTypes)

    pokeContainer.append(pokeName, pokeTypes);
    allPokemonsContainer.appendChild(pokeContainer);
}

function createPokemonImage(pokemonID, htmlContainer) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image');

    const pokemonImage = document.createElement('img');
    pokemonImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`

    imageContainer.append(pokemonImage);
    htmlContainer.append(imageContainer);
}

function getPokemonTypes(types, ul) {
    types.forEach(function (type) {
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}


document.querySelector('#previous').onclick = () =>{
    if (previousUrl) {
        requestApi(previousUrl);
        $("#pokelist").empty();
    }
}

document.querySelector('#next').onclick = () =>{
    requestApi(nextUrl);
    $("#pokelist").empty();
}

requestApi(apiUrl);
