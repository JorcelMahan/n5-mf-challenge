import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByText('N5 CHALLENGE')).toBeInTheDocument();
  });

  it('renders language selector', () => {
    render(<App />);
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('renders both character list buttons', () => {
    render(<App />);
    expect(
      screen.getByText('View Rick & Morty characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('View Harry Potter characters')
    ).toBeInTheDocument();
  });

  it('displays initial message when no list is selected', () => {
    render(<App />);
    expect(
      screen.getByText('Please select a character list.')
    ).toBeInTheDocument();
  });

  it('maintains component structure and accessibility', () => {
    render(<App />);

    // Check that buttons are accessible
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    // Check that the main heading is present
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('N5 CHALLENGE');
  });
});
