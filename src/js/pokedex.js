
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
        const typeLi = createNode('li');
        typeLi.innerText = type['type']['name'];
        append(ul, typeLi);
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

document.querySelector('#searchButton').addEventListener('click', function(e){
    const buscarPokemon = document.querySelector('#inputPokemon').value.toLowerCase();
    if(buscarPokemon){

        fetch(`https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`)
        .then( response => response.json() )
        .then( response => searchPokemon(response) )
        .catch( e => {
            alert(`No se encontro un pokemon con el nombre ${buscarPokemon}`);
        } )
    }
}, false);


function searchPokemon(pokemon){
    let $pokemonID = document.querySelector('#pokemon-id'),
        $pokemonName = document.querySelector('#pokemon-name'),
        $pokemonType = document.querySelector('#pokemon-type'),
        $pokemonImage = document.querySelector('#pokemon-image');
    
    $pokemonID.textContent = '';
    $pokemonName.textContent = '';
    $pokemonType.innerHTML = '';
    $pokemonImage.innerHTML = '';



    console.log(pokemon);
    const $hiddenDivs = document.querySelectorAll('.hidden');
    $hiddenDivs.forEach( div => {
        div.classList.remove('hidden');
    })
    $pokemonID.textContent = pokemon.id;
    $pokemonName.textContent = pokemon.name;
    console.log($pokemonType)

    getPokemonTypes(pokemon.types, $pokemonType);    
    createPokemonImage(pokemon.id, $pokemonImage);
}

$pokeList.onclick = (e) => {
    console.log(e.path[2]);
}
