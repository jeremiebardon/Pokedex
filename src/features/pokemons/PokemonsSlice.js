import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokemonAPI from '../../api/pokemonAPI';

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchAll',
  async ({ paginateBy, currentPage }, { rejectWithValue }) => {
    try {
      const pokemonList = await pokemonAPI.fetchAll(paginateBy, currentPage);
      const results = await Promise.all(
        pokemonList.data.results.map(async (pokemon) => {
          const poke = await pokemonAPI.fetchPokemonByName(pokemon.name);
          return poke.data;
        }),
      );
      const response = {
        ...pokemonList.data,
        results,
        currentPage,
        paginateBy,
      };
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  pokemons: [],
  paginationPage: 1,
  pokemonPerPage: 50,
  nextPage: false,
  previousPage: false,
  count: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
};

/* eslint-disable */
/*
*  Under th hood redux-toolkit let us mutate the state directly with the use
*  of Immer
*  Doc: https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
*/
const pokemonsListSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    resetState(state) {
      state.pokemons = [];
    },
  },
  extraReducers: {
    [fetchPokemons.fulfilled]: (state, action) => {
      state.pokemonPerPage = action.payload.paginateBy;
      state.paginationPage = action.payload.currentPage;
      state.loading = false;
      state.count = action.payload.count;
      state.nextPage = action.payload.next;
      state.previousPage = action.payload.previous;
      state.pokemons = action.payload.results;
    },
    [fetchPokemons.pending]: (state) => {
      state.loading = true;
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { resetState } = pokemonsListSlice.actions;

export default pokemonsListSlice.reducer;
