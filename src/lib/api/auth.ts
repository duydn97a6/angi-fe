import { apiClient } from './client';

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: { email: string; password: string; name: string }) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  googleAuth: async (token: string) => {
    const response = await apiClient.post('/auth/google', { token });
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
