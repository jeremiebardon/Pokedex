import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokemonAPI from '../../api/pokemonAPI';

const initialState = {
  stats: {},
  evolution: {},
  loading: true,
};

export const fetchPokemonByName = createAsyncThunk(
  'pokemons/fetchPokemonByName',
  async ({ name, history }, { rejectWithValue }) => {
    try {
      if (history) {
        history.push(`/pokemons/${name}`);
      }
      const pokemon = await pokemonAPI.fetchPokemonByName(name);
      const pokemonSpecies = await fetch(pokemon.data.species.url).then((res) => res.json());
      const pokemonEvolChain = await fetch(pokemonSpecies.evolution_chain.url)
        .then((res) => res.json());

      return {
        stats: pokemon.data,
        evolution: pokemonEvolChain,
      };
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/* eslint-disable */
/*
*  Under th hood redux-toolkit let us mutate the state directly with the use
*  of Immer
*  Doc: https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
*/
const pokemonProfilSlice = createSlice({
  name: 'pokemonProfil',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: {
    [fetchPokemonByName.fulfilled]: (state, action) => {
      state.stats = action.payload.stats;
      state.evolution = action.payload.evolution;
      state.loading = false;
    },
    [fetchPokemonByName.pending]: (state) => {
      state.loading = true;
    },
    [fetchPokemonByName.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { resetState } = pokemonProfilSlice.actions;

export default pokemonProfilSlice.reducer;
