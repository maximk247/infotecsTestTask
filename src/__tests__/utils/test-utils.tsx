import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import AllTheProviders from '../__providers__/AllTheProviders';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
