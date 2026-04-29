import { apiClient } from './client';
import { unwrapApiResponse } from './response';

export const userApi = {
  getMe: async () => {
    const response = await apiClient.get('/users/me');
    return unwrapApiResponse(response.data);
  },

  updateMe: async (data: { name?: string; phone?: string; avatarUrl?: string }) => {
    const response = await apiClient.patch('/users/me', data);
    return unwrapApiResponse(response.data);
  },

  updatePreferences: async (data: any) => {
    const response = await apiClient.put('/users/me/preferences', data);
    return unwrapApiResponse(response.data);
  },

  completeOnboarding: async (data: any) => {
    const response = await apiClient.post('/users/me/onboarding/complete', data);
    return unwrapApiResponse(response.data);
  },
};
