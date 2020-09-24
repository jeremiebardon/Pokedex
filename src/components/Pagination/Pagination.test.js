import React from 'react';
import '../../../__mocks__/matchMedia';
import { render, fireEvent } from '@testing-library/react';
import { test, expect, jest } from 'jest-without-globals';

import Pagination from './Pagination';

/* eslint-disable */ 
const props = {
  itemsCount: 1050,
  itemsPerPage: 50,
  currentPage: 2,
  handlePagination: jest.fn(),
  pageLoad: false,
  changePagination: jest.fn(),
};

test('Render Pagination', () => {
  const component = render(<Pagination { ...props } />);
  expect(component).toMatchSnapshot();
});

test('Pagination Click', () => {
  const { container, getByTitle } = render(<Pagination { ...props }/>);
  fireEvent.click(getByTitle('3'), container);
  expect(props.handlePagination).toHaveBeenCalledWith(3, props.itemsPerPage);
});
