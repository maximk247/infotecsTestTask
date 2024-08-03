import React from 'react';
import { UserSearchProps } from '../interfaces/user-search.interface';
import { SearchInput } from './SearchInput';
import { SearchKeySelect } from './SearchKeySelect';

const UserSearch: React.FC<UserSearchProps> = ({
  searchTerm,
  searchKey,
  onSearch,
  onKeyChange,
}) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <SearchInput
        value={searchTerm}
        onChange={(value) => onSearch(searchKey, value)}
        placeholder="Search..."
      />
      <SearchKeySelect value={searchKey} onChange={onKeyChange} />
    </div>
  );
};

export default UserSearch;
