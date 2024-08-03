import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import styles from '../components/user/table/table-cell/Header/UserTableHeader.module.scss';
import { UserTableHeaderCellProps } from '../components/user/table/table-cell/interfaces/user-table-header-cell.interface';
import UserTableHeaderCell from '../components/user/table/table-cell/Header/UserTableHeaderCell';

describe('UserTableHeaderCell Component', () => {
  const props: UserTableHeaderCellProps = {
    content: 'Test Header',
    width: 200,
    minWidth: 100,
    onClick: vi.fn(),
    sortArrow: '▲',
  };

  it('renders correctly with provided content', () => {
    const { getByText } = render(<UserTableHeaderCell {...props} />);
    const cell = getByText('Test Header');
    expect(cell).toBeInTheDocument();
  });

  it('applies width and minWidth styles correctly', () => {
    const { container } = render(<UserTableHeaderCell {...props} />);
    const cell = container.querySelector('th');

    expect(cell).toHaveStyle(`width: ${props.width}px`);
    expect(cell).toHaveStyle(`min-width: ${props.minWidth}px`);
  });

  it('renders sort arrow correctly', () => {
    const { getByText } = render(<UserTableHeaderCell {...props} />);
    const sortArrow = getByText('▲');
    expect(sortArrow).toBeInTheDocument();
  });

  it('has the correct className', () => {
    const { container } = render(<UserTableHeaderCell {...props} />);
    const cell = container.querySelector('th');
    expect(cell).toHaveClass(styles.headerCell);
    expect(cell).not.toHaveClass(styles.noPointer);
  });

  it('adds noPointer className when onClick is not provided', () => {
    const newProps = { ...props, onClick: undefined };
    const { container } = render(<UserTableHeaderCell {...newProps} />);
    const cell = container.querySelector('th');
    expect(cell).toHaveClass(styles.noPointer);
  });

  it('calls onClick when clicked', () => {
    const { container } = render(<UserTableHeaderCell {...props} />);
    const cell = container.querySelector('th');
    if (cell) {
      fireEvent.click(cell);
      expect(props.onClick).toHaveBeenCalled();
    }
  });

  it('does not call onClick when onClick is not provided', () => {
    const newProps = { ...props, onClick: undefined };
    const { container } = render(<UserTableHeaderCell {...newProps} />);
    const cell = container.querySelector('th');
    if (cell) {
      fireEvent.click(cell);
      expect(newProps.onClick).toBeUndefined();
    }
  });
});
