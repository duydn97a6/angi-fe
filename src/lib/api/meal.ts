import { apiClient } from './client';

export const mealApi = {
  getHistory: async (params?: { period?: string }) => {
    const response = await apiClient.get('/meals/history', { params });
    return response.data;
  },

  getStats: async (params?: { period?: string }) => {
    const response = await apiClient.get('/meals/stats', { params });
    return response.data;
  },
};
