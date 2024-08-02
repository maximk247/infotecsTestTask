import React from 'react';
import { UserTableHeaderProps } from './interfaces/user-table-header.interface';

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  columnWidths,
  onSort,
  getSortArrow,
}) => {
  return (
    <thead>
      <tr>
        <th
          style={{
            width: `${columnWidths.firstName}px`,
            minWidth: 50,
          }}
          onClick={() => onSort('firstName')}
        >
          ФИО <span className="sort-arrow">{getSortArrow('firstName')}</span>
        </th>
        <th
          style={{
            width: `${columnWidths.age}px`,
            minWidth: 50,
          }}
          onClick={() => onSort('age')}
        >
          Возраст <span className="sort-arrow">{getSortArrow('age')}</span>
        </th>
        <th
          style={{
            width: `${columnWidths.gender}px`,
            minWidth: 50,
          }}
          onClick={() => onSort('gender')}
        >
          Пол <span className="sort-arrow">{getSortArrow('gender')}</span>
        </th>
        <th
          style={{
            width: `${columnWidths.phone}px`,
            minWidth: 50,
          }}
        >
          Номер телефона
        </th>
        <th
          style={{
            width: `${columnWidths.addressCity}px`,
            minWidth: 50,
          }}
          onClick={() => onSort('address.city')}
        >
          Адрес{' '}
          <span className="sort-arrow">{getSortArrow('address.city')}</span>
        </th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
