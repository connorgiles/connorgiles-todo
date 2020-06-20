import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Todos title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Todos/i);
    expect(titleElement).toBeInTheDocument();
  });
});
