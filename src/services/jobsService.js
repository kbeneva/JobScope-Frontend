import { publicApiClient, optionalAuthApiClient } from './api';

export const jobsService = {
  // optional auth
  searchJobs: async (filters = {}, page = 1, limit = 10) => {
    try {
      console.log("🌐 jobsService.searchJobs CALLED");
      console.log("📦 Filters received:", filters);
      console.log("📄 Page:", page, "Limit:", limit);

      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      // Ajouter title si présent
      if (filters.title) {
        params.append('title', filters.title);
      }
if (filters.jobType && Array.isArray(filters.jobType)) {
        filters.jobType.forEach(type => {
          params.append('jobType', type); // jobType=X&jobType=Y
        });
      }

      // ✅ Ajouter chaque experience séparément (SANS [])
      if (filters.experience && Array.isArray(filters.experience)) {
        filters.experience.forEach(exp => {
          params.append('experience', exp);
        });
      }

      const queryString = params.toString();
      console.log("📤 Query string:", queryString);

      const response = await optionalAuthApiClient.get(`/jobs/search?${queryString}`);

      console.log("✅ API Response received:", {
        status: response.status,
        dataKeys: Object.keys(response.data),
        total: response.data.total,
        itemsCount: response.data.items?.length,
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