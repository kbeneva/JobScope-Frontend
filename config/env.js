import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { API_LOCAL_IP, API_PORT, API_STAGING_URL, API_PROD_URL } from '@env';

const ENV = {
  dev: {
    apiUrl: Platform.OS === 'android' 
      ? `http://10.0.2.2:${API_PORT}/api`  // emulateur
      : `http://${API_LOCAL_IP}:${API_PORT}/api`, // my ip
  },
  staging: {
    apiUrl: API_STAGING_URL,
  },
  prod: {
    apiUrl: API_PROD_URL,
  },
};

const getEnvVars = (env = Constants.expoConfig?.extra?.environment || 'dev') => {
  if (env === 'prod') {
    return ENV.prod;
  } else if (env === 'staging') {
    return ENV.staging;
  }
  return ENV.dev;
};

export default getEnvVars();