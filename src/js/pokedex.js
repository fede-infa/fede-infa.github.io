/// <reference types="jquery" />

const ALL_POKEMONS = {};
let url = 'https://pokeapi.co/api/v2/pokemon';
let nextUrl = null;



function getPokemonList(url){
    fetch(url)
        .then( response => response.json())
        .then( response => addPokemonToList(response))
        .catch( error => console.error('Fallo', error) );
}

function getPokemonById(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then( response => response)
        .then( response => console.log(response))
        .catch( error => console.error('Fallo', error));
};


function addPokemonToList(pokemons){
    console.log(pokemons);
    pokemons.results.forEach( (pokemon) => {
        const $ol = document.querySelector('#pokemon-list');
        const newLi = document.createElement('li');
        const liContent = document.createTextNode(pokemon.name)

        let imagePokemon = getPokemonById(pokemon.name); //Bug, no me guarda ninguna informacion en la variable
        console.log(imagePokemon);

        const newImage = document.createElement('img');
        // newImage.src = imagePokemon.sprites.front_default;
        newLi.appendChild(liContent)
        $ol.appendChild(newLi)
        $ol.appendChild(newImage)
    })
}

getPokemonList();
