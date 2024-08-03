import React from 'react';
import { UserTableBodyProps } from '../interfaces/user-table-body.interface';
import UserTableCell from '../table-cell/UserTableCell';

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  onRowClick,
  columnWidths,
}) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id} onClick={() => onRowClick(user)}>
          <UserTableCell
            content={`${user.firstName} ${user.lastName}`}
            maxWidth={columnWidths.firstName}
            minWidth={50}
          />
          <UserTableCell
            content={user.age}
            maxWidth={columnWidths.age}
            minWidth={50}
          />
          <UserTableCell
            content={user.gender}
            maxWidth={columnWidths.gender}
            minWidth={50}
          />
          <UserTableCell
            content={user.phone}
            maxWidth={columnWidths.phone}
            minWidth={50}
          />
          <UserTableCell
            content={`${user.address.city}, ${user.address.address}`}
            maxWidth={columnWidths.addressCity}
            minWidth={50}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableBody;
