import React from 'react';
import { UserTableBodyCellProps } from '../interfaces/user-table-body-cell.interface';
import styles from './UserTableBodyCell.module.scss';

const UserTableBodyCell: React.FC<UserTableBodyCellProps> = ({
  content,
  maxWidth,
  minWidth,
}) => {
  return (
    <td
      style={{
        maxWidth: `${maxWidth}px`,
        minWidth: `${minWidth}px`,
      }}
      className={styles.bodyTableCell}
    >
      {content}
    </td>
  );
};

export default UserTableBodyCell;
