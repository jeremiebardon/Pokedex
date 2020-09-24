const getPokemonChain = (chain, array, depth = 1) => {
  const results = array || [];
  const evoNumber = chain.evolves_to.length;

  const data = {
    name: chain.species.name,
    min_level: chain.evolution_details[0] !== undefined ? chain.evolution_details[0].min_level : 0,
    depth,
  };

  if (chain.evolves_to.length >= 0 && evoNumber < 2) {
    if (!chain.evolves_to.length) return [...results, data];
    return getPokemonChain(chain.evolves_to[0], [...results, data], ++depth);
  }

  if (evoNumber > 1) {
    ++depth
    const pokeChain = chain.evolves_to.map((pokemon) => {
      return {
        name: pokemon.species.name,
        min_level: pokemon.evolution_details[0] !== undefined
          ? pokemon.evolution_details[0].min_level
          : 0,
        depth,
      };
    });
    return [data, ...results, ...pokeChain];
  }
  return results;
};

export default getPokemonChain;
