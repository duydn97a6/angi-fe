import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/lib/stores/locationStore';
import { contextApi } from '@/lib/api/context';

export function useWeather() {
  const location = useLocationStore((s) => s.currentLocation);

  return useQuery({
    queryKey: ['weather', location?.lat, location?.lng],
    queryFn: () => contextApi.getWeather(location!.lat, location!.lng),
    enabled: !!location,
    staleTime: 60 * 60 * 1000,   // 1 hour
  });
}
