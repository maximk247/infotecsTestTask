import React from 'react';
import { SearchInputProps } from '../interfaces/search-input.interface';
import styles from './SearchInput.module.scss';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.searchInput}
    />
  );
};

export default SearchInput;
