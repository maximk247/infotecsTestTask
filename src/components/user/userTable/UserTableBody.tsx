import React from 'react';
import { UserTableBodyProps } from './interfaces/user-table-body.interface';

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  onRowClick,
  columnWidths,
}) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id} onClick={() => onRowClick(user)}>
          <td
            style={{
              maxWidth: `${columnWidths.firstName}px`,
              minWidth: 50,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {`${user.firstName} ${user.lastName}`}
          </td>
          <td
            style={{
              maxWidth: `${columnWidths.age}px`,
              minWidth: 50,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.age}
          </td>
          <td
            style={{
              maxWidth: `${columnWidths.gender}px`,
              minWidth: 50,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.gender}
          </td>
          <td
            style={{
              maxWidth: `${columnWidths.phone}px`,
              minWidth: 50,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.phone}
          </td>
          <td
            style={{
              maxWidth: `${columnWidths.addressCity}px`,
              minWidth: 50,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {`${user.address.city}, ${user.address.address}`}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableBody;
