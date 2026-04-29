import { apiClient } from './client';

export const userApi = {
  getMe: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  updateMe: async (data: { name?: string; phone?: string; avatarUrl?: string }) => {
    const response = await apiClient.patch('/users/me', data);
    return response.data;
  },

  updatePreferences: async (data: any) => {
    const response = await apiClient.put('/users/me/preferences', data);
    return response.data;
  },

  completeOnboarding: async (data: any) => {
    const response = await apiClient.post('/users/me/onboarding/complete', data);
    return response.data;
  },
};
