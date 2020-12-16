import { append, createNode } from "./utilities.js";

let $pokeList = document.querySelector('#pokelist');

export function getPokemon(pokemon) {
    let allPokemonsContainer = document.querySelector('#pokelist');
    let pokeContainer = createNode("div")
    pokeContainer.classList.add('card', 'col-sm-6', 'col-lg-4', 'text-capitalize');
    pokeContainer.id = `${pokemon.id}`;
    
    createPokemonImage(pokemon.id, pokeContainer);
    
    let pokeID = createNode('h4')
    pokeID.innerText = `#${pokemon.id}`
    
    let pokeName = createNode('h5')
    pokeName.innerText = `${pokemon.name}`
     
    let pokeTypes = createNode('ul')

    getPokemonTypes(pokemon.types, pokeTypes)
    
    append(pokeContainer, pokeID);
    append(pokeContainer, pokeName);
    append(pokeContainer, pokeTypes);
    
    append(allPokemonsContainer, pokeContainer);
    
    return pokemon;
}

export function createPokemonImage(pokemonID, htmlContainer) {
    const imageContainer = document.createElement('div');
    const pokemonImage = document.createElement('img');
    
    imageContainer.classList.add('image');
    pokemonImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`
    
    imageContainer.append(pokemonImage);
    htmlContainer.append(imageContainer);
}

export function getPokemonTypes(types, ul) {
    types.forEach(function (type) {
        const typeLi = createNode('li');
        typeLi.innerText = type['type']['name'];
        append(ul, typeLi);
    })
}

function searchPokemon(pokemon){
    
    let $pokemonID = document.querySelector('#pokemon-id'),
    $pokemonName = document.querySelector('#pokemon-name'),
    $pokemonType = document.querySelector('#pokemon-type'),
    $pokemonImage = document.querySelector('#pokemon-image');
    
    $pokemonID.textContent = '';
    $pokemonName.textContent = '';
    $pokemonType.innerHTML = '';
    $pokemonImage.innerHTML = '';
    
    const $hiddenDivs = document.querySelectorAll('.hidden');
    $hiddenDivs.forEach( div => {
        div.classList.remove('hidden');
    })
    $pokemonID.textContent = pokemon.id;
    $pokemonName.textContent = pokemon.name;
    
    getPokemonTypes(pokemon.types, $pokemonType);    
    createPokemonImage(pokemon.id, $pokemonImage);
}

$pokeList.addEventListener('click', e => {
    let buscarPokemon = '';
    e.path.forEach( array => {
        if( array.id > 0){
            const errorText = document.querySelector('.error-text')
            errorText.classList.add('hidden');
            buscarPokemon = array.id;
            return buscarPokemon
        }
    });
    fetch(`https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`)
    .then( response => response.json())
    .then( response => {
        searchPokemon(response);
        hideError();
    })
    .catch( e => {
        showError();
    })
    
});

export function showError(){
    const $inputPokemon = document.querySelector('#inputPokemon'),
        $searchDiv = document.querySelector('#searchDiv');
    let errorText = document.querySelector('.error-text')

    errorText.textContent = `No se encontró el pokemon ingresado`;
    errorText.classList.remove('hidden');
    $inputPokemon.classList.add('error-message');
}

export function hideError(){
    const errorText = document.querySelector('#errorText')
    errorText.classList.add( 'error-text','hidden');
    console.log(errorText);
}


export const previousButton = document.querySelector('#previous').onclick = () =>{
    if (previousUrl) {
        requestApi(previousUrl);
        $("#pokelist").empty();
    }
}

export const nextButton = document.querySelector('#next').onclick = () =>{
    requestApi(nextUrl);
    $("#pokelist").empty();
}

export const searchButton = document.querySelector('#searchButton').addEventListener('click', function(e){
    const buscarPokemon = document.querySelector('#inputPokemon').value.toLowerCase();
    if(buscarPokemon){

        fetch(`https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`)
        .then( response => response.json() )
        .then( response => {
            searchPokemon(response)
            hideError();
        })
        .catch( e => {
            showError();
        });
    }
}, false);

export const inputButton = document.querySelector("#inputPokemon").addEventListener("keyup", e => {
    const buscarPokemon = document.querySelector('#inputPokemon').value.toLowerCase();
    if( e.keyCode === 13){
        const errorText = document.querySelector('.error-text')
        errorText.classList.add('hidden');
        fetch(`https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`)
        .then( response => response.json())
        .then( response => {
            searchPokemon(response);
            hideError();
        })
        .catch( e => {
            showError();
        })

        }
    })
