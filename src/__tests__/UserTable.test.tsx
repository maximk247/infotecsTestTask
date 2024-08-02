/* eslint-disable no-undef */
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { User } from '../components/user/interfaces/user.interface';
import UserTable from '../components/user/userTable/UserTable';

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
    height: 180,
    weight: 75,
    email: 'john.doe@example.com',
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
    height: 165,
    weight: 60,
    email: 'jane.doe@example.com',
  },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ users }),
  })
) as unknown as jest.Mock;

describe('UserTable', () => {
  const onRowClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading initially', async () => {
    await act(async () => {
      const { getByText } = render(<UserTable onRowClick={onRowClick} />);
      setTimeout(() => {
        expect(getByText('Loading...')).toBeInTheDocument();
      }, 1000);
    });
  });

  test('renders user data correctly', async () => {
    const { getByText } = render(<UserTable onRowClick={onRowClick} />);
    await waitFor(() => {
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
  });

  test('displays error message on fetch error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Network response was not ok'))
    );
    const { getByText } = render(<UserTable onRowClick={onRowClick} />);
    await waitFor(() => {
      expect(
        getByText('Error: Network response was not ok')
      ).toBeInTheDocument();
    });
  });

  test('calls onRowClick when a row is clicked', async () => {
    const { getByText } = render(<UserTable onRowClick={onRowClick} />);
    await waitFor(() => {
      fireEvent.click(getByText('John Doe'));
      expect(onRowClick).toHaveBeenCalledWith(users[0]);
    });
  });

  test('handles search correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <UserTable onRowClick={onRowClick} />
    );
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('Search...'), {
      target: { value: 'Jane' },
    });
    await waitFor(() => {
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    const { getByText, getByRole } = render(
      <UserTable onRowClick={onRowClick} />
    );
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(getByRole('button', { name: /Next »/ }));
    await waitFor(() => {
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('handles sorting correctly', async () => {
    const { getByText } = render(<UserTable onRowClick={onRowClick} />);
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(getByText('ФИО'));
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });
  });
});
