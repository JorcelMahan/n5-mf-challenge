const BASE_URL = 'https://rickandmortyapi.com/api';

export const rickAndMortyApi = {
  async getCharacters() {
    try {
      const response = await fetch(`${BASE_URL}/character`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw new Error(`Failed to fetch characters: ${error.message}`);
    }
  },
};
