import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserTableHeaderProps } from '../components/user/table/interfaces/user-table-header.interface';
import UserTableHeader from '../components/user/table/header/UserTableHeader';

describe('UserTableHeader', () => {
  const onSort = vi.fn();
  const getSortArrow = vi.fn();
  const columnWidths = {
    firstName: 150,
    age: 100,
    gender: 100,
    phone: 150,
    addressCity: 200,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = (props: Partial<UserTableHeaderProps> = {}) => {
    const defaultProps: UserTableHeaderProps = {
      columnWidths,
      onSort,
      getSortArrow,
    };

    return render(
      <table>
        <UserTableHeader {...defaultProps} {...props} />
      </table>
    );
  };

  test('renders table headers correctly', () => {
    const { getByText } = renderHeader();

    expect(getByText('ФИО')).toBeInTheDocument();
    expect(getByText('Возраст')).toBeInTheDocument();
    expect(getByText('Пол')).toBeInTheDocument();
    expect(getByText('Номер телефона')).toBeInTheDocument();
    expect(getByText('Адрес')).toBeInTheDocument();
  });

  test('calls onSort with correct key when header is clicked', () => {
    const { getByText } = renderHeader();

    fireEvent.click(getByText('ФИО'));
    expect(onSort).toHaveBeenCalledWith('firstName');

    fireEvent.click(getByText('Возраст'));
    expect(onSort).toHaveBeenCalledWith('age');

    fireEvent.click(getByText('Пол'));
    expect(onSort).toHaveBeenCalledWith('gender');

    fireEvent.click(getByText('Адрес'));
    expect(onSort).toHaveBeenCalledWith('address.city');
  });

  test('displays sort arrows correctly', () => {
    getSortArrow.mockImplementation((key) => {
      if (key === 'firstName') return '▲';
      if (key === 'age') return '▼';
      return '';
    });

    const { getByText } = renderHeader();

    expect(getByText('ФИО').querySelector('.sort-arrow')).toHaveTextContent(
      '▲'
    );
    expect(getByText('Возраст').querySelector('.sort-arrow')).toHaveTextContent(
      '▼'
    );
  });
});
