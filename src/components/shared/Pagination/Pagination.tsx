import React from 'react';
import { PaginationProps } from '../interfaces/pagination.interface';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div>
      <button onClick={onPreviousPage} disabled={currentPage === 1}>
        &laquo; Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
