import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { UserTableBodyCellProps } from '../components/user/table/table-cell/interfaces/user-table-body-cell.interface';
import UserTableBodyCell from '../components/user/table/table-cell/CellBody/UserTableBodyCell';
import styles from '../components/user/table/table-cell/Body/UserTableBodyCell.module.scss';

describe('UserTableBodyCell Component', () => {
  const props: UserTableBodyCellProps = {
    content: 'Test Content',
    maxWidth: 200,
    minWidth: 100,
  };

  it('renders correctly with provided content', () => {
    const { getByText } = render(<UserTableBodyCell {...props} />);
    const cell = getByText('Test Content');
    expect(cell).toBeInTheDocument();
  });

  it('applies maxWidth and minWidth styles correctly', () => {
    const { container } = render(<UserTableBodyCell {...props} />);
    const cell = container.querySelector('td');

    expect(cell).toHaveStyle(`max-width: ${props.maxWidth}px`);
    expect(cell).toHaveStyle(`min-width: ${props.minWidth}px`);
  });

  it('has the correct className', () => {
    const { container } = render(<UserTableBodyCell {...props} />);
    const cell = container.querySelector('td');
    expect(cell).toHaveClass(styles.bodyTableCell);
  });
});
