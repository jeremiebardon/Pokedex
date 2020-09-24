import pokemonInstance from './config';

function limit(paginateBy, p) {
  return p <= 1 ? `offset=0&limit=${paginateBy}` : `offset=${(p * paginateBy) - paginateBy}&limit=${paginateBy}`;
}

export default {
  fetchAll: (paginateBy, p) => pokemonInstance.get(`/pokemon?${limit(paginateBy, p)}`),
  fetchPokemonByName: (id) => pokemonInstance.get(`/pokemon/${id}`),
  fetchPokemonSpecies: (id) => pokemonInstance.get(`/pokemon-species/${id}`),
  fetchPokemonEvolution: (id) => pokemonInstance.get(`/evolution-chain/${id}`),
};
