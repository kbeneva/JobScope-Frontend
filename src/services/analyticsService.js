import { publicApiClient } from './api';

export const analyticsService = {
  getOverview: async () => {
    try {
      const response = await publicApiClient.get('/analytics/dashboard/overview');
      return response.data;
    } catch (error) {
      console.error('Erreur getOverview:', error);
      throw error;
    }
  },

  getDomainDashboard: async (domain) => {
    try {
      const response = await publicApiClient.get(`/analytics/dashboard/domain/${domain}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getDomainDashboard:', error);
      throw error;
    }
  },
};