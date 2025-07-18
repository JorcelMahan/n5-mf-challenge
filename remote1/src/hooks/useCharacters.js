import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../services/rickAndMortyApi';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      const charactersData = await rickAndMortyApi.getCharacters();
      setCharacters(charactersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    loading,
    error,
    refetch: fetchCharacters,
  };
};
