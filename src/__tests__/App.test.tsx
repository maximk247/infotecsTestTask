import { describe, it, expect } from 'vitest';
import { render } from './utils/test-utils'; // используем наш customRender
import App from '../App';

describe('App rendering', () => {
  it('renders the main page', () => {
    const { getByText } = render(<App />);
    expect(getByText('Имя')).toBeInTheDocument(); // пример проверки на наличие элемента
  });
});
