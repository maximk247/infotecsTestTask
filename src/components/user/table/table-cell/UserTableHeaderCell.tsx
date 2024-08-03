import React from 'react';
import { UserTableHeaderCellProps } from './interfaces/user-table-header-cell.interface';

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
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {content} <span className="sort-arrow">{sortArrow}</span>
    </th>
  );
};

export default UserTableHeaderCell;
