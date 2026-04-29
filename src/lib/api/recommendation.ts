import { apiClient } from './client';

export const recommendationApi = {
  get: async (params: { lat: number; lng: number }) => {
    const response = await apiClient.get('/recommendations', { params });
    return response.data;
  },

  trackClick: async (id: string, index: number) => {
    await apiClient.post(`/recommendations/${id}/click`, { index });
  },

  refresh: async (params: { lat: number; lng: number }) => {
    const response = await apiClient.post('/recommendations/refresh', params);
    return response.data;
  },
};
