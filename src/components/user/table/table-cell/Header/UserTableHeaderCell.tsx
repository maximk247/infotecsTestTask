import React from 'react';
import { UserTableHeaderCellProps } from '../interfaces/user-table-header-cell.interface';
import styles from './UserTableHeader.module.scss';

const UserTableHeaderCell: React.FC<UserTableHeaderCellProps> = ({
  content,
  width,
  minWidth,
  onClick,
  sortArrow,
}) => {
  return (
    <th
      style={{
        width: `${width}px`,
        minWidth: `${minWidth}px`,
      }}
      className={`${styles.headerCell} ${onClick ? '' : styles.noPointer}`}
      onClick={onClick}
    >
      <div className={styles.cellContent}>
        <span>{content}</span>
        <span className={styles.sortArrow}>{sortArrow}</span>
      </div>
    </th>
  );
};

export default UserTableHeaderCell;
