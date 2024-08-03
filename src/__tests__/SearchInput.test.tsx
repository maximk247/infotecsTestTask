import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { SearchInputProps } from '../components/user/Search/interfaces/search-input.interface';
import { SearchInput } from '../components/user/Search/SearchInput';

describe('SearchInput Component', () => {
  let props: SearchInputProps;
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
    props = {
      value: '',
      onChange,
      placeholder: 'Search...',
    };
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchInput {...props} />);
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    props.value = 'Test';
    const { getByDisplayValue } = render(<SearchInput {...props} />);
    expect(getByDisplayValue('Test')).toBeInTheDocument();
  });

  it('calls onChange with the correct argument when input changes', () => {
    const { getByPlaceholderText } = render(<SearchInput {...props} />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(onChange).toHaveBeenCalledWith('New Value');
  });
});
