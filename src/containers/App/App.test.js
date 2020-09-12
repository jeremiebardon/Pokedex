import React from 'react';
import renderer from 'react-test-renderer';
import { test, expect } from 'jest-without-globals';

import App from './App';

test('Render App', () => {
  const component = renderer.create(
    <App />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
