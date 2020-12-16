
const apiURL = 'https://pokeapi.co/api/v2/pokemon';

export function requestApi(apiURL, callbackObtenerPokemon){
    fetch(apiURL)
    .then( (response) => response.json() )
    .then( (response) => {
        // nextUrl = response.next;
        // previousUrl = response.previous;
        response.results.forEach( pokemon => {
            createPokemons(pokemon, callbackObtenerPokemon);
        });
    })
    .catch(err => {
        console.error(err);
    });
} 

export function createPokemons(pokemon, callbackObtenerPokemon) {
    let pokemonUrl = pokemon.url // Me guardo la url de cada pokemon en esta variable.
    fetch(pokemonUrl)
    .then(response => response.json())
    .then(callbackObtenerPokemon);
}
