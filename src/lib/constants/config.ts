export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const CACHE_TTL = {
  RECOMMENDATION: 15 * 60 * 1000, // 15 minutes
  WEATHER: 60 * 60 * 1000, // 1 hour
  USER: 5 * 60 * 1000, // 5 minutes
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
