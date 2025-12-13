import { publicApiClient, privateApiClient } from './api';
import * as SecureStore from 'expo-secure-store';

export const authService = {
  register: async (userData) => {
    try {
      const response = await publicApiClient.post('/auth/register', userData);
      if (response.data.token) {
        await SecureStore.setItemAsync('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error register:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await publicApiClient.post('/auth/login', {
        email,
        password,
      });
      if (response.data.token) {
        await SecureStore.setItemAsync('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await privateApiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error logout:', error);
    } finally {
      await SecureStore.deleteItemAsync('userToken');
    }
  },
};