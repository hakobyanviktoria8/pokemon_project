import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render App component', () => {
  render(<App />);
  const header = screen.getByText(/List All Pokemons/i);
  expect(header);
});
