import React, { useState, useEffect } from 'react';
import UserSearch from '../UserSearch';
import Pagination from '../../shared/Pagination';
import UserTableHeader from './UserTableHeader';
import UserTableBody from './UserTableBody';
import { User } from '../interfaces/user.interface';
import { SortConfig } from '../../../interfaces/sort-config.interface';
import { UserTableProps } from './interfaces/user-table.interface';

const UserTable: React.FC<UserTableProps> = ({ onRowClick }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('firstName');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [columnWidths] = useState({
    firstName: 150,
    age: 100,
    gender: 100,
    phone: 150,
    addressCity: 200,
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setInitialLoading(true);
    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.users);
        setUsers(data.users);
        setInitialLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setInitialLoading(false);
      });
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (searchKey: string, value: string) => {
    if (searchKey !== 'gender') {
      value = capitalizeFirstLetter(value);
    }
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim() === '') {
      fetchUsers();
      return;
    }
    fetch(
      `https://dummyjson.com/users/filter?key=${searchKey}&value=${encodeURIComponent(value)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => setError(error.message));
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction) {
      const aValue = getValueByPath(a, sortConfig.key);
      const bValue = getValueByPath(b, sortConfig.key);
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | '' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = '';
    } else {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        return ' ▲';
      } else if (sortConfig.direction === 'desc') {
        return ' ▼';
      }
    }
    return '';
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <UserSearch
        searchTerm={searchTerm}
        searchKey={searchKey}
        onSearch={handleSearch}
        onKeyChange={(key) => setSearchKey(key)}
      />
      {initialLoading ? (
        <p>Loading...</p>
      ) : sortedUsers.length > 0 ? (
        <>
          <table>
            <UserTableHeader
              columnWidths={columnWidths}
              onSort={requestSort}
              getSortArrow={getSortArrow}
            />
            <UserTableBody
              users={currentUsers}
              onRowClick={onRowClick}
              columnWidths={columnWidths}
            />
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserTable;
