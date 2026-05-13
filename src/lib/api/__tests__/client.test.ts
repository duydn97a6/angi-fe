import { describe, it, expect } from 'vitest';
import { apiClient } from '../client';

describe('apiClient', () => {
  it('has correct base URL configured', () => {
    expect(apiClient.defaults.baseURL).toBeTruthy();
  });

  it('has correct timeout configured', () => {
    expect(apiClient.defaults.timeout).toBe(10000);
  });

  it('has JSON content type header', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('has request interceptor registered', () => {
    expect(apiClient.interceptors.request.handlers?.length).toBeGreaterThan(0);
  });

  it('has response interceptor registered', () => {
    expect(apiClient.interceptors.response.handlers?.length).toBeGreaterThan(0);
  });
});