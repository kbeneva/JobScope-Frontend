import { privateApiClient } from './api';

export const favoritesService = {
  getFavorites: async (page = 1, limit = 10) => {
    try {
      const response = await privateApiClient.get('/favorites', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error getFavorites:', error);
      throw error;
    }
  },

  addFavorite: async (jobId) => {
    try {
      const response = await privateApiClient.post(`/favorites/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error addFavorite:', error);
      throw error;
    }
  },

  removeFavorite: async (jobId) => {
    try {
      const response = await privateApiClient.delete(`/favorites/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error removeFavorite:', error);
      throw error;
    }
  },
};