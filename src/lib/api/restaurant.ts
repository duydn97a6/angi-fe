import { apiClient } from './client';

export const restaurantApi = {
  search: async (params: {
    lat: number;
    lng: number;
    radius?: number;
    cuisine?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
  }) => {
    const response = await apiClient.get('/restaurants', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/restaurants/slug/${slug}`);
    return response.data;
  },

  getDishes: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}/dishes`);
    return response.data;
  },

  getDishById: async (id: string) => {
    const response = await apiClient.get(`/restaurants/dishes/${id}`);
    return response.data;
  },
};