import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from '../../components/Loading';

describe('Loading', () => {
  it('renders loading message', () => {
    render(<Loading />);

    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<Loading />);

    // Check that the component renders without errors
    expect(container.firstChild).toBeInTheDocument();
  });
});
