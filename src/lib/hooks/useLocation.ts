import { useEffect } from 'react';
import { useLocationStore } from '@/lib/stores/locationStore';
import { useAuth } from './useAuth';

export function useLocation() {
  const { user } = useAuth();
  const { currentLocation, isLoading, error, getCurrentLocation, setOfficeLocation } = useLocationStore();

  useEffect(() => {
    if (!currentLocation) {
      getCurrentLocation().then(() => {
        const state = useLocationStore.getState();
        if (state.error && user?.preferences?.officeLocation) {
          setOfficeLocation(user.preferences.officeLocation);
        }
      });
    }
  }, [currentLocation, getCurrentLocation, setOfficeLocation, user]);

  return {
    location: currentLocation,
    isLoading,
    error,
    refetch: getCurrentLocation,
  };
}
