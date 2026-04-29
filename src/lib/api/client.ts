import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants/config';
import { useAuthStore } from '@/lib/stores/authStore';
import { normalizeToken } from '@/lib/utils/token';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: Add JWT token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers) {
    delete config.headers.Authorization;
  }
  return config;
});

function getAccessToken() {
  if (typeof window === 'undefined') return null;

  const runtimeToken = useAuthStore.getState().accessToken;
  const normalizedRuntimeToken = normalizeToken(runtimeToken);
  if (normalizedRuntimeToken) return normalizedRuntimeToken;

  const authState = localStorage.getItem('angi-auth');
  const persistedToken = authState ? normalizeToken(JSON.parse(authState)?.state?.accessToken) : null;
  if (persistedToken) return persistedToken;

  const cookieToken = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('accessToken='))
    ?.split('=')[1] ?? null;

  return normalizeToken(cookieToken);
}

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
