const BASE_URL = 'https://hp-api.onrender.com/api';

export const harryPotterApi = {
  async getCharacters() {
    try {
      const response = await fetch(`${BASE_URL}/characters`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw new Error(`Failed to fetch characters: ${error.message}`);
    }
  },
};
