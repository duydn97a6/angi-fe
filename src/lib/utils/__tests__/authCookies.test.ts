import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setAuthCookies, clearAuthCookies } from '../authCookies';

describe('setAuthCookies', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('sets accessToken cookie', () => {
    setAuthCookies('my-access-token');
    expect(document.cookie).toContain('accessToken=my-access-token');
  });

  it('sets refreshToken cookie when provided', () => {
    setAuthCookies('access-token', 'refresh-token');
    expect(document.cookie).toContain('refreshToken=refresh-token');
  });

  it('calls clearAuthCookies when access token is invalid', () => {
    const spy = vi.spyOn(document, 'cookie', 'set');
    setAuthCookies('');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('clearAuthCookies', () => {
  it('sets accessToken to expired', () => {
    const spy = vi.spyOn(document, 'cookie', 'set');
    clearAuthCookies();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});