import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSearch from '../components/user/Search/UserSearch';
import UserTableHeader from '../components/user/table/TableHeader/UserTableHeader';
import UserTableBody from '../components/user/table/TableBody/UserTableBody';
import { RootState } from '../reducers';
import {
  fetchUsers,
  fetchFilteredUsers,
  setSearchTerm,
  setSortConfig,
  setPage,
  setSearchKey,
  setSelectedUser,
} from '../reducers/userSlice';
import Pagination from '../components/shared/Pagination/Pagination';
import { AppDispatch } from '../store';
import { columnWidths } from '../consts/column-width.const';

const UserTableContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    loading,
    error,
    searchTerm,
    searchKey,
    sortConfig,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      dispatch(fetchUsers());
    } else {
      dispatch(fetchFilteredUsers({ key: searchKey, value: searchTerm }));
    }
  }, [dispatch, searchTerm, searchKey]);

  // Обновляет поисковый запрос и ключ, а также сбрасывает страницу на первую.
  const handleSearch = (searchKey: string, value: string) => {
    dispatch(setSearchTerm(value));
    dispatch(setSearchKey(searchKey));
    dispatch(setPage(1));
  };

  // Контроль сортировки под логическую часть для работы с redux
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | '' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = '';
    } else {
      direction = 'asc';
    }
    dispatch(setSortConfig({ key, direction }));
  };

  // Визуальный контроль сортировки (стрелки или их отсутствие)
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

  // Контроль пагинации
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  // Переменные для работы с пагинацией
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Отображение текущих пользователей
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <UserSearch
        searchTerm={searchTerm}
        searchKey={searchKey}
        onSearch={handleSearch}
        onKeyChange={(key) => dispatch(setSearchKey(key))}
      />
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <>
          <table className="table">
            <UserTableHeader
              columnWidths={columnWidths}
              onSort={requestSort}
              getSortArrow={getSortArrow}
            />
            <UserTableBody
              users={currentUsers}
              columnWidths={columnWidths}
              onRowClick={(user) => dispatch(setSelectedUser(user))}
            />
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserTableContainer;
