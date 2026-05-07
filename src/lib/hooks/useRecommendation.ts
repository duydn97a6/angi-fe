import { useQuery, useQueryClient } from '@tanstack/react-query';
import { recommendationApi } from '@/lib/api/recommendation';
import type { RecommendationResponse } from '@/types';

export function useRecommendation(lat?: number, lng?: number) {
  return useQuery<RecommendationResponse>({
    queryKey: ['recommendation', lat, lng],
    queryFn: async () => {
      const response = await recommendationApi.get({ lat: lat!, lng: lng! });
      return response.data ?? response;
    },
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