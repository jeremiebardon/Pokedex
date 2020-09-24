import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'jest-without-globals';
import '../../../__mocks__/matchMedia';
import * as redux from 'react-redux';

import PokemonsList from './PokemonsList';

test('Render PokemonsList', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const useSelectorSpy = jest.spyOn(redux, 'useSelector');
  const mockDispatchFn = jest.fn();
  const mockSelectorFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);
  useSelectorSpy.mockReturnValue(mockSelectorFn);

  const component = render(<PokemonsList />, { wrapper: MemoryRouter });
  expect(component).toMatchSnapshot();
});
