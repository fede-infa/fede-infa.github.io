
let nextUrl = '',
    previousUrl = '',
    pokemonUrl = '',
    $pokeList = document.querySelector('#pokelist'),
    $allPokemonDivs = '',
    apiUrl = 'https://pokeapi.co/api/v2/pokemon';

const nextButton = document.querySelector('#next'),
    previousButton = document.querySelector('#previous');


function createNode(element){
    return document.createElement(element);
}

function append(parent, element){
    return parent.appendChild(element);
}


function requestApi(apiURL){
    fetch(apiURL)
    .then( response => response.json() )
    .then( response => {
        nextUrl = response.next;
        previousUrl = response.previous;
        response.results.forEach( pokemon => {
            createPokemons(pokemon);
        });
    })
} 

function createPokemons(pokemon) {
    let pokemonUrl = pokemon.url // Me guardo la url de cada pokemon en esta variable.
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(function (pokemon) {
            getPokemon(pokemon);
        });
}

function getPokemon(pokemon) {
    let allPokemonsContainer = document.querySelector('#pokelist');
    let pokeContainer = createNode("div")
    pokeContainer.classList.add('col-md-2','card');
    pokeContainer.id = `${pokemon.id}`;

    createPokemonImage(pokemon.id, pokeContainer);

    let pokeName = createNode('h4')
    pokeName.innerText = `#${pokemon.id} - ${pokemon.name}`

    let pokeTypes = createNode('ul')

    getPokemonTypes(pokemon.types, pokeTypes)
    
    append(pokeContainer, pokeName);
    append(pokeContainer, pokeTypes);

    append(allPokemonsContainer, pokeContainer);

    return pokemon;
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

$pokeList.addEventListener('click', function(e){
    if (e.path[2].id != 0) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${e.path[2].id}`)
            .then( response => response.json() )
            .then( response => console.log(response) )

    }

}, false);
