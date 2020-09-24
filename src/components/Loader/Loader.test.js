import React from 'react';
import renderer from 'react-test-renderer';
import { test, expect } from 'jest-without-globals';

import Loader from './Loader';

test('Render App', () => {
  const component = renderer.create(
    <Loader />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
