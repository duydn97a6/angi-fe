import { apiClient } from './client';

export const restaurantApi = {
  search: async (params: { lat: number; lng: number; radius?: number }) => {
    const response = await apiClient.get('/restaurants', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },

  getDishes: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}/dishes`);
    return response.data;
  },
};
