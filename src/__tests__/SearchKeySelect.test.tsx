import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { SearchKeySelectProps } from '../components/user/Search/interfaces/search-key-select.interface';
import { SearchKeySelect } from '../components/user/Search/SearchKeySelect';

describe('SearchKeySelect Component', () => {
  let props: SearchKeySelectProps;
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
    props = {
      value: 'firstName',
      onChange,
    };
  });

  it('renders correctly', () => {
    const { getByDisplayValue } = render(<SearchKeySelect {...props} />);
    expect(getByDisplayValue('Имя')).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    props.value = 'lastName';
    const { getByDisplayValue } = render(<SearchKeySelect {...props} />);
    expect(getByDisplayValue('Фамилия')).toBeInTheDocument();
  });

  it('calls onChange with the correct argument when selection changes', () => {
    const { getByDisplayValue } = render(<SearchKeySelect {...props} />);
    const select = getByDisplayValue('Имя');
    fireEvent.change(select, { target: { value: 'age' } });
    expect(onChange).toHaveBeenCalledWith('age');
  });
});
