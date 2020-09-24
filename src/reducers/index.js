import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import pokemons from '../features/pokemons/PokemonsSlice';
import pokemonProfil from '../features/pokemonProfil/PokemonProfilSlice';

const reducer = combineReducers({
  pokemons,
  pokemonProfil,
});

const store = configureStore({
  reducer,
});

export default store;
