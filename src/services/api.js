import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import ENV from '../../config/env';

const baseConfig = {
  baseURL: ENV.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const publicApiClient = axios.create(baseConfig);

export const privateApiClient = axios.create(baseConfig);

export const optionalAuthApiClient = axios.create(baseConfig);

// auth mandatory
privateApiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject(new Error('Authentication required'));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// auth optional
optionalAuthApiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// error handler
const handleAuthError = async (error) => {
  if (error.response?.status === 401) {
    await SecureStore.deleteItemAsync('userToken');
    console.log('Session expirée');
    // TODO: login redirect / pop up?
  }
  return Promise.reject(error);
};

privateApiClient.interceptors.response.use(
  (response) => response,
  handleAuthError
);

optionalAuthApiClient.interceptors.response.use(
  (response) => response,
  handleAuthError
);

export default publicApiClient;