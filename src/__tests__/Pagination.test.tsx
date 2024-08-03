import { render, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Pagination from '../components/shared/Pagination/Pagination';

describe('Pagination', () => {
  const onPreviousPage = vi.fn();
  const onNextPage = vi.fn();

  const renderPagination = (currentPage: number, totalPages: number) => {
    return render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders pagination correctly', () => {
    const { getByText } = renderPagination(1, 5);
    expect(getByText('Page 1 of 5')).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    const { getByText } = renderPagination(1, 5);
    expect(getByText('« Previous')).toBeDisabled();
  });

  test('disables next button on last page', () => {
    const { getByText } = renderPagination(5, 5);
    expect(getByText('Next »')).toBeDisabled();
  });

  test('enables previous and next buttons on middle pages', () => {
    const { getByText } = renderPagination(3, 5);
    expect(getByText('« Previous')).not.toBeDisabled();
    expect(getByText('Next »')).not.toBeDisabled();
  });

  test('calls onPreviousPage when previous button is clicked', () => {
    const { getByText } = renderPagination(3, 5);
    fireEvent.click(getByText('« Previous'));
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
  });

  test('calls onNextPage when next button is clicked', () => {
    const { getByText } = renderPagination(3, 5);
    fireEvent.click(getByText('Next »'));
    expect(onNextPage).toHaveBeenCalledTimes(1);
  });
});
