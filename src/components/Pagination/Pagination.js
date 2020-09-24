import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'antd';

export default function PaginationBar({
  itemsCount,
  itemsPerPage,
  currentPage,
  handlePagination,
  pageLoad,
}) {
  function changePagination(page, itemByPage) {
    handlePagination(page, itemByPage);
  }

  return (
    <>
      {itemsCount && (
        <Pagination
          disabled={pageLoad}
          style={{ textAlign: 'center' }}
          defaultCurrent={currentPage}
          total={itemsCount}
          defaultPageSize={itemsPerPage}
          onChange={changePagination}
          responsive
        />
      )}
    </>
  );
}

PaginationBar.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number,
  pageLoad: PropTypes.bool,
};

PaginationBar.defaultProps = {
  itemsCount: null,
  pageLoad: false,
};
