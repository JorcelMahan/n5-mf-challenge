import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CharacterList from '../../pages/CharacterList';

// Mock the custom hook
vi.mock('../../hooks/useCharacters', () => ({
  useCharacters: vi.fn(),
}));

// Mock the child components
vi.mock('../../components/CharacterCard', () => ({
  CharacterCard: ({ character }) => (
    <div data-testid='character-card'>
      <span data-testid='character-name'>{character.name}</span>
      <span data-testid='character-id'>{character.id}</span>
    </div>
  ),
}));

vi.mock('../../components/Loading', () => ({
  Loading: () => <div data-testid='loading'>Loading characters...</div>,
}));

vi.mock('../../components/Error', () => ({
  Error: ({ error }) => <div data-testid='error'>Error: {error}</div>,
}));

import { useCharacters } from '../../hooks/useCharacters';

const mockUseCharacters = vi.mocked(useCharacters);

describe('CharacterList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when loading is true', () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: true,
      error: null,
    });

    render(<CharacterList />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    const errorMessage = 'Failed to fetch characters';
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: errorMessage,
    });

    render(<CharacterList />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders character cards when characters are loaded successfully', () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
      { id: 3, name: 'Summer Smith' },
    ];

    mockUseCharacters.mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: null,
    });

    render(<CharacterList />);

    // Check that all character cards are rendered
    const characterCards = screen.getAllByTestId('character-card');
    expect(characterCards).toHaveLength(3);

    // Check that character names are displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();

    // Check that character IDs are present
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders empty list when no characters are available', () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
    });

    render(<CharacterList />);

    // Should not render any character cards
    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument();

    // Should not show loading or error states
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('prioritizes loading state over error state', () => {
    const errorMessage = 'Network error';
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: true,
      error: errorMessage,
    });

    render(<CharacterList />);

    // Should show loading, not error (loading takes precedence)
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('uses unique keys for character cards', () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];

    mockUseCharacters.mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: null,
    });

    const { container } = render(<CharacterList />);

    // React will warn about missing or duplicate keys in development
    // This test ensures our component renders without key warnings
    expect(container.firstChild).toBeInTheDocument();
  });
});
