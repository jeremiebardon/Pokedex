import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import PokemonList from '../../features/pokemons/PokemonsList';
import PokemonProfil from '../../features/pokemonProfil/PokemonProfil';
import Page404 from '../Page404/Page404';

export default function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/" title="Pokemons List">
            <PokemonList />
          </Route>
          <Route exact path="/pokemons/:name" title="Pokemon Detail">
            <PokemonProfil />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
