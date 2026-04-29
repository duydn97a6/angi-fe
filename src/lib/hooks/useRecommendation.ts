import { useQuery, useQueryClient } from '@tanstack/react-query';
import { recommendationApi } from '@/lib/api/recommendation';

export function useRecommendation(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ['recommendation', lat, lng],
    queryFn: () => recommendationApi.get({ lat: lat!, lng: lng! }),
    staleTime: 15 * 60 * 1000,
    enabled: !!lat && !!lng,
  });
}

export function useRefreshRecommendation() {
  const queryClient = useQueryClient();

  return (lat: number, lng: number) => {
    queryClient.invalidateQueries({ queryKey: ['recommendation', lat, lng] });
  };
}
