import React from 'react';
import { UserTableBodyProps } from '../interfaces/user-table-body.interface';
import UserTableBodyCell from '../table-cell/CellBody/UserTableBodyCell';
import { User } from '../../interfaces/user.interface';

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  onRowClick,
  columnWidths,
}) => {
  const handleRowClick = (user: User) => (event: React.MouseEvent) => {
    if (event.button !== 0) {
      // Проверяем, что нажата левая кнопка мыши
      return;
    }
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      onRowClick(user);
    }
  };

  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id} onMouseUp={handleRowClick(user)}>
          <UserTableBodyCell
            content={`${user.firstName} ${user.lastName}`}
            maxWidth={columnWidths.firstName}
            minWidth={50}
          />
          <UserTableBodyCell
            content={user.age}
            maxWidth={columnWidths.age}
            minWidth={50}
          />
          <UserTableBodyCell
            content={user.gender}
            maxWidth={columnWidths.gender}
            minWidth={50}
          />
          <UserTableBodyCell
            content={user.phone}
            maxWidth={columnWidths.phone}
            minWidth={50}
          />
          <UserTableBodyCell
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
