import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/lib/stores/locationStore';
import { contextApi } from '@/lib/api/context';
import type { WeatherData } from '@/types';

export function useWeather() {
  const location = useLocationStore((s) => s.currentLocation);

  return useQuery<WeatherData>({
    queryKey: ['weather', location?.lat, location?.lng],
    queryFn: async () => {
      const response = await contextApi.getWeather(location!.lat, location!.lng);
      return response.data ?? response;
    },
    enabled: !!location,
    staleTime: 60 * 60 * 1000,
  });
}