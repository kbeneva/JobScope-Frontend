import { privateApiClient } from './api';

export const adminService = {
  getAllUsers: async (page = 1, limit = 10) => {
    try {
      const response = await privateApiClient.get('/admin/users', {
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      console.error('Error getAllUsers:', error);
      throw error;
    }
  },

  getUserInfo: async (userId) => {
    try {
      const response = await privateApiClient.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getUserInfo:', error);
      throw error;
    }
  },

  updateUser: async (userId, data) => {
    try {
      const response = await privateApiClient.put(
        `/admin/users/${userId}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error('Error updateUser:', error);

      if (error.response?.data?.code === 'PASSWORD_UPDATE_FORBIDDEN') {
        throw new Error('Admin cannot modify passwords');
      }

      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await privateApiClient.delete(`/admin/users/${userId}`);
      return true;
    } catch (error) {
      console.error('Error deleteUser:', error);
      throw error;
    }
  },
};