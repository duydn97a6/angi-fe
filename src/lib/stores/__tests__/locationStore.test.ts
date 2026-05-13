import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocationStore } from '../locationStore';

describe('locationStore', () => {
  beforeEach(() => {
    useLocationStore.setState({
      currentLocation: null,
      isLoading: false,
      error: null,
    });
  });

  it('sets manual location with manual source', () => {
    useLocationStore.getState().setManualLocation({
      lat: 10.762,
      lng: 106.66,
    });
    const state = useLocationStore.getState();
    expect(state.currentLocation).toEqual({
      lat: 10.762,
      lng: 106.66,
      source: 'manual',
    });
    expect(state.error).toBeNull();
  });

  it('sets office location with office source', () => {
    useLocationStore.getState().setOfficeLocation({
      lat: 21.02,
      lng: 105.78,
      address: 'HN Office',
    });
    const state = useLocationStore.getState();
    expect(state.currentLocation).toEqual({
      lat: 21.02,
      lng: 105.78,
      address: 'HN Office',
      source: 'office',
    });
  });

  it('handles geolocation not supported', async () => {
    const originalGeolocation = navigator.geolocation;
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });

    await useLocationStore.getState().getCurrentLocation();
    expect(useLocationStore.getState().error).toBe('Trình duyệt không hỗ trợ định vị');

    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
    });
  });

  it('handles geolocation permission denied', async () => {
    const mockGetCurrentPosition = vi.fn((_, onError) => {
      onError({ code: 1, message: 'User denied' });
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
    });

    await useLocationStore.getState().getCurrentLocation();
    expect(useLocationStore.getState().error).toBe('Bạn đã từ chối quyền truy cập vị trí');
  });

  it('handles geolocation position unavailable', async () => {
    const mockGetCurrentPosition = vi.fn((_, onError) => {
      onError({ code: 2, message: 'Position unavailable' });
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
    });

    await useLocationStore.getState().getCurrentLocation();
    expect(useLocationStore.getState().error).toBe('Không thể xác định vị trí');
  });

  it('handles geolocation timeout', async () => {
    const mockGetCurrentPosition = vi.fn((_, onError) => {
      onError({ code: 3, message: 'Timeout' });
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
    });

    await useLocationStore.getState().getCurrentLocation();
    expect(useLocationStore.getState().error).toBe('Hết thời gian chờ');
  });

  it('sets GPS location on success', async () => {
    const mockGetCurrentPosition = vi.fn((onSuccess) => {
      onSuccess({
        coords: { latitude: 10.762, longitude: 106.66, accuracy: 50 },
      });
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
    });

    await useLocationStore.getState().getCurrentLocation();
    const state = useLocationStore.getState();
    expect(state.currentLocation).toEqual({
      lat: 10.762,
      lng: 106.66,
      accuracy: 50,
      source: 'gps',
    });
    expect(state.isLoading).toBe(false);
  });
});