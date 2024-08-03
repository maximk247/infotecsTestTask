import { render, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import UserSearch from '../components/user/Search/UserSearch';

describe('UserSearch', () => {
  const onSearch = vi.fn();
  const onKeyChange = vi.fn();
  const searchTerm = 'John';
  const searchKey = 'firstName';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input and select elements correctly', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <UserSearch
        searchTerm={searchTerm}
        searchKey={searchKey}
        onSearch={onSearch}
        onKeyChange={onKeyChange}
      />
    );

    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(getByDisplayValue('John')).toBeInTheDocument();
    expect(getByDisplayValue('Имя')).toBeInTheDocument();
  });

  test('calls onSearch with correct arguments when input value changes', () => {
    const { getByPlaceholderText } = render(
      <UserSearch
        searchTerm={searchTerm}
        searchKey={searchKey}
        onSearch={onSearch}
        onKeyChange={onKeyChange}
      />
    );

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'Doe' },
    });
    expect(onSearch).toHaveBeenCalledWith('firstName', 'Doe');
  });

  test('calls onKeyChange with correct arguments when select value changes', () => {
    const { getByDisplayValue } = render(
      <UserSearch
        searchTerm={searchTerm}
        searchKey={searchKey}
        onSearch={onSearch}
        onKeyChange={onKeyChange}
      />
    );

    fireEvent.change(getByDisplayValue('Имя'), {
      target: { value: 'firstName' },
    });
    expect(onKeyChange).toHaveBeenCalledWith('firstName');
  });
});
