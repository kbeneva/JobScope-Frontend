import { privateApiClient } from './api';

export const userService = {
  getProfile: async () => {
    try {
      const response = await privateApiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error getProfile:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await privateApiClient.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updateProfile:', error);
      throw error;
    }
  },
};