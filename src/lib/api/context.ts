import { apiClient } from './client';

export const contextApi = {
  getWeather: async (lat: number, lng: number) => {
    const response = await apiClient.get('/context/weather', { params: { lat, lng } });
    return response.data;
  },
};
