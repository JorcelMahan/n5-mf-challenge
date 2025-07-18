import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Error } from '../../components/Error';

describe('Error', () => {
  it('renders error message', () => {
    const errorMessage = 'Something went wrong';
    render(<Error error={errorMessage} />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders with different error messages', () => {
    const customError = 'Network connection failed';
    render(<Error error={customError} />);

    expect(screen.getByText(`Error: ${customError}`)).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<Error error='Test error' />);

    // Check that the component renders without errors
    expect(container.firstChild).toBeInTheDocument();
  });
});
