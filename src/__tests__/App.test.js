import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

it('renders "Welcome to the Star Wars Universe"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Star Wars Universe/i);
  expect(linkElement).toBeInTheDocument();
});
