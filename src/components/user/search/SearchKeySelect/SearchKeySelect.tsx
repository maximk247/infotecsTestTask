import React from 'react';
import { SearchKeySelectProps } from '../interfaces/search-key-select.interface';
import styles from './SearchKeySelect.module.scss';

const SearchKeySelect: React.FC<SearchKeySelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchKeySelect}
    >
      <option value="firstName">Имя</option>
      <option value="lastName">Фамилия</option>
      <option value="age">Возраст</option>
      <option value="gender">Пол</option>
      <option value="phone">Номер телефона</option>
      <option value="address.city">Город</option>
      <option value="address.address">Улица</option>
    </select>
  );
};

export default SearchKeySelect;
