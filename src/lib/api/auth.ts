import { apiClient } from './client';
import { unwrapApiResponse } from './response';

interface UserSummary {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  onboarded?: boolean;
  isOnboarded?: boolean;
}

interface AuthResponse {
  user: UserSummary;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
  };
}

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    return unwrapApiResponse<AuthResponse>(response.data);
  },

  register: async (data: { email: string; password: string; name: string }) => {
    const response = await apiClient.post('/auth/register', data);
    return unwrapApiResponse<AuthResponse>(response.data);
  },

  googleAuth: async (idToken: string) => {
    const response = await apiClient.post('/auth/google', { idToken });
    return unwrapApiResponse<AuthResponse>(response.data);
  },

  refresh: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return unwrapApiResponse<TokenResponse>(response.data);
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
