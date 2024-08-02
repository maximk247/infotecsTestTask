import { render, fireEvent } from '@testing-library/react';
import {beforeEach, describe, expect, test, vi } from 'vitest';
import UserModal from '../components/user/UserModal';
import { User } from '../components/user/interfaces/user.interface';


const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  gender: 'male',
  phone: '+1 234 567 890',
  address: {
    city: 'New York',
    address: '123 Main St'
  },
  height: 180,
  weight: 75,
  email: 'john.doe@example.com',
};

describe('UserModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders user information correctly', () => {
    const { getByText } = render(<UserModal user={user} onClose={onClose} />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Возраст: 30')).toBeInTheDocument();
    expect(getByText('Пол: male')).toBeInTheDocument();
    expect(getByText('Телефон: +1 234 567 890')).toBeInTheDocument();
    expect(getByText('Адрес: New York, 123 Main St')).toBeInTheDocument();
    expect(getByText('Рост: 180')).toBeInTheDocument();
    expect(getByText('Вес: 75')).toBeInTheDocument();
    expect(getByText('Email: john.doe@example.com')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const { getByText } = render(<UserModal user={user} onClose={onClose} />);
    fireEvent.click(getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking outside the modal content', () => {
    const { getByRole } = render(<UserModal user={user} onClose={onClose} />);
    fireEvent.click(getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal content', () => {
    const { getByText } = render(<UserModal user={user} onClose={onClose} />);
    fireEvent.click(getByText('John Doe'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
