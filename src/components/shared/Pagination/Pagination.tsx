import React from 'react';
import { PaginationProps } from '../interfaces/pagination.interface';
import styles from './Pagination.module.scss';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        &laquo;&laquo; First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last &raquo;&raquo;
      </button>
    </div>
  );
};

export default Pagination;
