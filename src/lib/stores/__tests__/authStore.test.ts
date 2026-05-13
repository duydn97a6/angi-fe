import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  });

  it('starts unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('sets auth data correctly', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test User' };
    const tokens = { accessToken: 'valid-token', refreshToken: 'valid-refresh' };

    useAuthStore.getState().setAuth(user, tokens);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe('valid-token');
    expect(state.refreshToken).toBe('valid-refresh');
    expect(state.isAuthenticated).toBe(true);
  });

  it('throws on invalid access token', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };
    expect(() => {
      useAuthStore.getState().setAuth(user, { accessToken: '', refreshToken: null });
    }).toThrow('Invalid auth tokens');
  });

  it('throws on undefined-like access token', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };
    expect(() => {
      useAuthStore.getState().setAuth(user, { accessToken: 'undefined', refreshToken: null });
    }).toThrow('Invalid auth tokens');
  });

  it('clears auth on logout', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test User' };
    useAuthStore.getState().setAuth(user, { accessToken: 'valid-token', refreshToken: 'valid-refresh' });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('updates user with setUser', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test User' };
    useAuthStore.getState().setAuth(user, { accessToken: 'valid-token', refreshToken: 'valid-refresh' });

    useAuthStore.getState().setUser({ ...user, name: 'Updated Name' });
    expect(useAuthStore.getState().user?.name).toBe('Updated Name');
  });
});