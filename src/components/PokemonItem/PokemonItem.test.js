import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'jest-without-globals';

import PokemonsItem from './PokemonItem';

const props = {
  name: 'ivysaur',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
};

test('Render Item Element', () => {
  const component = render(
    <PokemonsItem name={props.name} image={props.image} types={props.types} />,
    { wrapper: MemoryRouter },
  );
  expect(component).toMatchSnapshot();
});

test('Render Text', () => {
  const component = render(
    <PokemonsItem name={props.name} image={props.image} types={props.types} />,
    { wrapper: MemoryRouter },
  );
  expect(component.getByText(props.name)).toBeInTheDocument();
});

test('Render Images', () => {
  const component = render(
    <PokemonsItem name={props.name} image={props.image} types={props.types} />,
    { wrapper: MemoryRouter },
  );
  expect(component.getByAltText(props.name)).toBeInTheDocument();
});
