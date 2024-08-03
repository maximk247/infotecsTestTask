import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { UserSearchProps } from '../components/user/interfaces/user-search.interface';
import UserSearch from '../components/user/Search/UserSearch';

describe('UserSearch Component', () => {
  let props: UserSearchProps;
  const onSearch = vi.fn();
  const onKeyChange = vi.fn();

  beforeEach(() => {
    onSearch.mockClear();
    onKeyChange.mockClear();
    props = {
      searchTerm: '',
      searchKey: 'firstName',
      onSearch,
      onKeyChange,
    };
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByRole } = render(
      <UserSearch {...props} />
    );
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onSearch with correct arguments when input changes', () => {
    const { getByPlaceholderText } = render(<UserSearch {...props} />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(onSearch).toHaveBeenCalledWith('firstName', 'John');
  });

  it('calls onKeyChange with correct argument when select changes', () => {
    const { getByRole } = render(<UserSearch {...props} />);
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'lastName' } });
    expect(onKeyChange).toHaveBeenCalledWith('lastName');
  });

  it('displays correct initial values', () => {
    props.searchTerm = 'Jane';
    props.searchKey = 'lastName';
    const { getByPlaceholderText, getByRole } = render(
      <UserSearch {...props} />
    );
    const input = getByPlaceholderText('Search...') as HTMLInputElement;
    const select = getByRole('combobox') as HTMLSelectElement;
    expect(input.value).toBe('Jane');
    expect(select.value).toBe('lastName');
  });
});
