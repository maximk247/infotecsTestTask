import React from 'react';
import { UserSearchProps } from './interfaces/user-search.interface';

const UserSearch: React.FC<UserSearchProps> = ({
  searchTerm,
  searchKey,
  onSearch,
  onKeyChange,
}) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(searchKey, e.target.value)}
        placeholder="Search..."
      />
      <select value={searchKey} onChange={(e) => onKeyChange(e.target.value)}>
        <option value="firstName">Имя</option>
        <option value="lastName">Фамилия</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="phone">Номер телефона</option>
        <option value="address.city">Город</option>
        <option value="address.address">Улица</option>
      </select>
    </div>
  );
};

export default UserSearch;
