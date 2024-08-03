import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/shared/Pagination/Pagination';

describe('Pagination Component', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders correctly', () => {
    const { getByText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('disables "previous" and "first" buttons on the first page', () => {
    const { getAllByRole } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    const buttons = getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled(); 
  });

  it('disables "next" and "last" buttons on the last page', () => {
    const { getAllByRole } = render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    const buttons = getAllByRole('button');
    expect(buttons[2]).toBeDisabled(); 
    expect(buttons[3]).toBeDisabled(); 
  });

  it('calls onPageChange with the correct arguments when buttons are clicked', () => {
    const { getAllByRole } = render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]); 
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(buttons[2]); 
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(buttons[3]); 
    expect(onPageChange).toHaveBeenCalledWith(5);

    fireEvent.click(buttons[0]);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('does not call onPageChange when buttons are disabled', () => {
    const { getAllByRole } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]); 
    fireEvent.click(buttons[0]);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
