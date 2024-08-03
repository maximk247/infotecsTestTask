import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserTableBodyProps } from '../components/user/table/interfaces/user-table-body.interface';
import UserTableBody from '../components/user/table/body/UserTableBody';
import { User } from '../components/user/interfaces/user.interface';

const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    phone: '+1 234 567 890',
    address: {
      city: 'New York',
      address: '123 Main St',
    },
    height: 0,
    weight: 0,
    email: '',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    age: 25,
    gender: 'female',
    phone: '+1 987 654 321',
    address: {
      city: 'Los Angeles',
      address: '456 Elm St',
    },
    height: 0,
    weight: 0,
    email: '',
  },
];

describe('UserTableBody', () => {
  const onRowClick = vi.fn();
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

  const renderBody = (props: Partial<UserTableBodyProps> = {}) => {
    const defaultProps: UserTableBodyProps = {
      users,
      onRowClick,
      columnWidths,
    };

    return render(
      <table>
        <UserTableBody {...defaultProps} {...props} />
      </table>
    );
  };

  test('renders user data correctly', () => {
    const { getByText } = renderBody();

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('male')).toBeInTheDocument();
    expect(getByText('+1 234 567 890')).toBeInTheDocument();
    expect(getByText('New York, 123 Main St')).toBeInTheDocument();

    expect(getByText('Jane Doe')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('female')).toBeInTheDocument();
    expect(getByText('+1 987 654 321')).toBeInTheDocument();
    expect(getByText('Los Angeles, 456 Elm St')).toBeInTheDocument();
  });

  test('calls onRowClick with correct user when row is clicked', () => {
    const { getByText } = renderBody();

    fireEvent.click(getByText('John Doe'));
    expect(onRowClick).toHaveBeenCalledWith(users[0]);

    fireEvent.click(getByText('Jane Doe'));
    expect(onRowClick).toHaveBeenCalledWith(users[1]);
  });
});
