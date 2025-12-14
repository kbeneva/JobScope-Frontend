import { publicApiClient, optionalAuthApiClient } from './api';

export const jobsService = {
  // optional auth
  searchJobs: async (query, page = 1, limit = 10) => {
    try {
      const response = await optionalAuthApiClient.get('/jobs/search', {
        params: { q: query, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error searchJobs:', error);
      throw error;
    }
  },

  // no auth
  getRecentJobs: async (limit = 10) => {
    try {
      const response = await publicApiClient.get('/jobs/recent', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error getRecentJobs:', error);
      throw error;
    }
  },

  // auth
  getPersonalizedJobs: async () => {
    try {
      const response = await privateApiClient.get('/jobs/personalized');
      return response.data;
    } catch (error) {
      console.error('Error getPersonalizedJobs:', error);
      throw error;
    }
  },

  // optional auth
  getJobById: async (jobId) => {
    try {
      const response = await optionalAuthApiClient.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error getJobById:', error);
      throw error;
    }
  },
};