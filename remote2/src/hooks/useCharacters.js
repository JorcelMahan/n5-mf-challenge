import { useEffect, useState } from 'react';
import { harryPotterApi } from '../services/harryPotterApi';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      const charactersData = await harryPotterApi.getCharacters();
      setCharacters(charactersData.slice(0, 20));
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
