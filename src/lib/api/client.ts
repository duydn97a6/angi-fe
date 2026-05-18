import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants/config';
import { useAuthStore } from '@/lib/stores/authStore';
import { normalizeToken } from '@/lib/utils/token';
import { analytics } from '@/lib/analytics';
import { trackApiCall } from '@/lib/analytics/performance';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: Add JWT token + timing
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers) {
    delete config.headers.Authorization;
  }

  // Store start time for response time tracking
  config.metadata = { startTime: Date.now() };

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

// Response interceptor: Track timing + handle errors
apiClient.interceptors.response.use(
  (response) => {
    const startTime = (response.config.metadata as { startTime?: number })?.startTime;
    if (startTime) {
      const duration = Date.now() - startTime;
      trackApiCall(response.config.url ?? 'unknown', duration, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();

    // Track API response time for errors too
    const startTime = (error.config?.metadata as { startTime?: number })?.startTime;
    if (startTime) {
      const duration = Date.now() - startTime;
      trackApiCall(url ?? 'unknown', duration, status ?? 0);
    }

    // Track API errors
    if (status && status >= 400) {
      analytics.track('api_error', {
        url,
        method,
        status,
        message: error.message,
      });
    }

    if (status === 401) {
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

// Extend Axios config metadata type
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: { startTime?: number };
  }
}