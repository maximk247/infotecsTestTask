// src/components/UserTableHeader.tsx
import React from 'react';
import { UserTableHeaderProps } from '../interfaces/user-table-header.interface';
import UserTableHeaderCell from '../table-cell/UserTableHeaderCell';

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  columnWidths,
  onSort,
  getSortArrow,
}) => {
  return (
    <thead>
      <tr>
        <UserTableHeaderCell
          content="ФИО"
          width={columnWidths.firstName}
          minWidth={50}
          onClick={() => onSort('firstName')}
          sortArrow={getSortArrow('firstName')}
        />
        <UserTableHeaderCell
          content="Возраст"
          width={columnWidths.age}
          minWidth={50}
          onClick={() => onSort('age')}
          sortArrow={getSortArrow('age')}
        />
        <UserTableHeaderCell
          content="Пол"
          width={columnWidths.gender}
          minWidth={50}
          onClick={() => onSort('gender')}
          sortArrow={getSortArrow('gender')}
        />
        <UserTableHeaderCell
          content="Номер телефона"
          width={columnWidths.phone}
          minWidth={50}
        />
        <UserTableHeaderCell
          content="Адрес"
          width={columnWidths.addressCity}
          minWidth={50}
          onClick={() => onSort('address.city')}
          sortArrow={getSortArrow('address.city')}
        />
      </tr>
    </thead>
  );
};

export default UserTableHeader;
