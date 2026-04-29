import { useEffect } from 'react';
import { useLocationStore } from '@/lib/stores/locationStore';
import { useAuth } from './useAuth';

export function useLocation() {
  const { user } = useAuth();
  const { currentLocation, isLoading, error, getCurrentLocation, useOfficeLocation } = useLocationStore();

  useEffect(() => {
    if (!currentLocation) {
      // Try GPS first
      getCurrentLocation().then(() => {
        // If failed and user has office location, fallback
        const state = useLocationStore.getState();
        if (state.error && user?.preferences?.officeLocation) {
          useOfficeLocation(user.preferences.officeLocation);
        }
      });
    }
  }, [user]);

  return {
    location: currentLocation,
    isLoading,
    error,
    refetch: getCurrentLocation,
  };
}
