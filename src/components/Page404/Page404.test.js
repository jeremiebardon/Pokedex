import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { test, expect } from 'jest-without-globals';

import Page404 from './Page404';

test('Render Page 404', () => {
  const component = renderer.create(
    <Page404 />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render Error Message', () => {
  const history = createMemoryHistory();
  history.push('/bad-route');

  const { container } = render(
    <Router history={history}>
      <Page404 />
    </Router>,
  );
  expect(container.textContent).toMatch('You are in the Void');
});
