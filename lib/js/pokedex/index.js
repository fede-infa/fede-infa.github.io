import { requestApi } from './consumos.js';
import { createPokemonImage, getPokemon, getPokemonTypes, hideError, showError, inputButton, nextButton, previousButton, searchButton } from './ui.js';

async function inicializar() {
    await requestApi();
}

inicializar();