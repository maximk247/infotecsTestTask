import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSearch from '../components/user/Search/UserSearch';
import UserTableHeader from '../components/user/table/Header/UserTableHeader';
import UserTableBody from '../components/user/table/Body/UserTableBody';
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

  const handleSearch = (searchKey: string, value: string) => {
    dispatch(setSearchTerm(value));
    dispatch(setSearchKey(searchKey));
    dispatch(setPage(1));
  };

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

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

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
              columnWidths={{
                firstName: 150,
                age: 100,
                gender: 100,
                phone: 150,
                addressCity: 200,
              }}
              onSort={requestSort}
              getSortArrow={getSortArrow}
            />
            <UserTableBody
              users={currentUsers}
              columnWidths={{
                firstName: 150,
                age: 100,
                gender: 100,
                phone: 150,
                addressCity: 200,
              }}
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
