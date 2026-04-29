import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants/config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: Add JWT token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authState = typeof window !== 'undefined' ? localStorage.getItem('angi-auth') : null;
  const token = authState ? JSON.parse(authState)?.state?.accessToken : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('angi-auth');
        document.cookie = 'accessToken=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'refreshToken=; path=/; max-age=0; SameSite=Lax';
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
