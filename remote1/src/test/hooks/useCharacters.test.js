import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCharacters } from '../../hooks/useCharacters';

// Mock the API service
vi.mock('../../services/rickAndMortyApi', () => ({
  rickAndMortyApi: {
    getCharacters: vi.fn(),
  },
}));

import { rickAndMortyApi } from '../../services/rickAndMortyApi';

const mockGetCharacters = vi.mocked(rickAndMortyApi.getCharacters);

describe('useCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    mockGetCharacters.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useCharacters());

    expect(result.current.characters).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch characters successfully', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];

    mockGetCharacters.mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useCharacters());

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the hook to finish loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.error).toBe(null);
    expect(mockGetCharacters).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch characters';
    mockGetCharacters.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCharacters());

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for the hook to finish loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(mockGetCharacters).toHaveBeenCalledTimes(1);
  });

  it('should allow refetching characters', async () => {
    const mockCharacters = [{ id: 1, name: 'Rick Sanchez' }];

    mockGetCharacters.mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useCharacters());

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockCharacters);
    expect(mockGetCharacters).toHaveBeenCalledTimes(1);

    // Clear the mock call count
    mockGetCharacters.mockClear();

    // Refetch
    const updatedCharacters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];
    mockGetCharacters.mockResolvedValue(updatedCharacters);

    // Call refetch wrapped in act
    await act(async () => {
      result.current.refetch();
    });

    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.characters).toEqual(updatedCharacters);
    });

    expect(mockGetCharacters).toHaveBeenCalledTimes(1);
  });

  it('should reset error state when refetching after an error', async () => {
    // First call fails
    mockGetCharacters.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useCharacters());

    // Wait for initial fetch to fail
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');

    // Second call succeeds
    const mockCharacters = [{ id: 1, name: 'Rick Sanchez' }];
    mockGetCharacters.mockResolvedValue(mockCharacters);

    // Refetch wrapped in act
    await act(async () => {
      result.current.refetch();
    });

    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.error).toBe(null);
  });
});
