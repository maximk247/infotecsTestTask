import React from 'react';
import { UserTableCellProps } from './interfaces/user-table-cell.interface';

const UserTableCell: React.FC<UserTableCellProps> = ({
  content,
  maxWidth,
  minWidth,
}) => {
  return (
    <td
      style={{
        maxWidth: `${maxWidth}px`,
        minWidth: `${minWidth}px`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {content}
    </td>
  );
};

export default UserTableCell;
