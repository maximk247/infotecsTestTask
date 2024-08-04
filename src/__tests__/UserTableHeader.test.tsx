import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import UserTableHeader from '../components/user/table/TableHeader/UserTableHeader';
import { UserTableHeaderProps } from '../components/user/table/interfaces/user-table-header.interface';

describe('UserTableHeader Component', () => {
  const props: UserTableHeaderProps = {
    columnWidths: {
      firstName: 150,
      age: 100,
      gender: 100,
      phone: 150,
      addressCity: 200,
    },
    onSort: vi.fn(),
    getSortArrow: vi.fn((key: string) => (key === 'firstName' ? '▲' : '')),
  };

  it('renders correctly with provided content', () => {
    const { getByText } = render(<UserTableHeader {...props} />);
    expect(getByText('ФИО')).toBeInTheDocument();
    expect(getByText('Возраст')).toBeInTheDocument();
    expect(getByText('Пол')).toBeInTheDocument();
    expect(getByText('Номер телефона')).toBeInTheDocument();
    expect(getByText('Адрес')).toBeInTheDocument();
  });

  it('applies width and minWidth styles correctly', () => {
    const { container } = render(<UserTableHeader {...props} />);
    const cells = container.querySelectorAll('th');

    expect(cells[0]).toHaveStyle(`width: ${props.columnWidths.firstName}px`);
    expect(cells[1]).toHaveStyle(`width: ${props.columnWidths.age}px`);
    expect(cells[2]).toHaveStyle(`width: ${props.columnWidths.gender}px`);
    expect(cells[3]).toHaveStyle(`width: ${props.columnWidths.phone}px`);
    expect(cells[4]).toHaveStyle(`width: ${props.columnWidths.addressCity}px`);
  });

  it('renders sort arrow correctly', () => {
    const { container } = render(<UserTableHeader {...props} />);
    const firstNameCell = container.querySelectorAll('th')[0];
    expect(firstNameCell).toHaveTextContent('▲');
  });

  it('calls onSort when sortable headers are clicked', () => {
    const { container } = render(<UserTableHeader {...props} />);
    const firstNameCell = container.querySelectorAll('th')[0];
    const ageCell = container.querySelectorAll('th')[1];

    fireEvent.click(firstNameCell);
    expect(props.onSort).toHaveBeenCalledWith('firstName');

    fireEvent.click(ageCell);
    expect(props.onSort).toHaveBeenCalledWith('age');
  });

  it('does not call onSort when non-sortable headers are clicked', () => {
    const { container } = render(<UserTableHeader {...props} />);
    const phoneCell = container.querySelectorAll('th')[3];

    fireEvent.click(phoneCell);
    expect(props.onSort).not.toHaveBeenCalledWith('phone');
  });
});
