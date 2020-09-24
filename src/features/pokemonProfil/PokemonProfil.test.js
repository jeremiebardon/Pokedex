import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { expect, jest } from 'jest-without-globals';
import '../../../__mocks__/matchMedia';
import * as redux from 'react-redux';

import PokemonProfil from './PokemonProfil';

function renderWithRouterMatch(
  ui,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>,
    ),
  };
}

describe('Test Profil Page', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const useSelectorSpy = jest.spyOn(redux, 'useSelector');
  const mockDispatchFn = jest.fn();
  const mockSelectorFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);
  useSelectorSpy.mockReturnValue(mockSelectorFn);

  it('Should Render Pokemon Profil', () => {
    const { container } = renderWithRouterMatch(PokemonProfil, {
      route: '/pokemons/bulbasaur',
      path: '/pokemons/:name',
    });

    expect(container).toMatchSnapshot();
  });
});
