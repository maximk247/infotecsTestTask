import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { UserTableBodyProps } from '../components/user/table/interfaces/user-table-body.interface';
import UserTableBody from '../components/user/table/TableBody/UserTableBody';
import { User } from '../components/user/interfaces/user.interface';

const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'Male',
    phone: '+1 123 456 7890',
    address: { city: 'New York', address: '123 Main St' },
    height: 0,
    weight: 0,
    email: '',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    gender: 'Female',
    phone: '+1 987 654 3210',
    address: { city: 'Los Angeles', address: '456 Elm St' },
    height: 0,
    weight: 0,
    email: '',
  },
];

const columnWidths = {
  firstName: 150,
  age: 100,
  gender: 100,
  phone: 150,
  addressCity: 200,
};

describe('UserTableBody Component', () => {
  const onRowClick = vi.fn();

  const props: UserTableBodyProps = {
    users,
    onRowClick,
    columnWidths,
  };

  it('renders correctly with provided users', () => {
    const { getByText } = render(<UserTableBody {...props} />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
  });

  it('applies width and minWidth styles correctly', () => {
    const { container } = render(<UserTableBody {...props} />);
    const cells = container.querySelectorAll('td');

    expect(cells[0]).toHaveStyle(`max-width: ${columnWidths.firstName}px`);
    expect(cells[1]).toHaveStyle(`max-width: ${columnWidths.age}px`);
    expect(cells[2]).toHaveStyle(`max-width: ${columnWidths.gender}px`);
    expect(cells[3]).toHaveStyle(`max-width: ${columnWidths.phone}px`);
    expect(cells[4]).toHaveStyle(`max-width: ${columnWidths.addressCity}px`);
  });

  it('calls onRowClick when a row is clicked with left button', () => {
    const { container } = render(<UserTableBody {...props} />);
    const row = container.querySelectorAll('tr')[0];

    fireEvent.mouseUp(row, { button: 0 });
    expect(onRowClick).toHaveBeenCalledWith(users[0]);
  });
});
