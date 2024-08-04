import React from 'react';
import { PaginationProps } from '../interfaces/pagination.interface';
import styles from './Pagination.module.scss';

//Использовал библиотеку svgr, превращающую svg в реакт-компоненты
import PreviousIcon from '../../../assets//svg/line-angle-left-icon.svg?react';
import EndIcon from '../../../assets/svg/arrow-end-left-icon.svg?react';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <EndIcon className={styles.icon}></EndIcon>
      </button>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PreviousIcon className={styles.icon} />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <PreviousIcon className={`${styles.icon} ${styles.rotate}`} />
      </button>
      <button
        className={styles.button}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <EndIcon className={`${styles.icon} ${styles.rotate}`}></EndIcon>
      </button>
    </div>
  );
};

export default Pagination;
