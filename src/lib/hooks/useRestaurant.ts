import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '@/lib/api/restaurant';
import type { Restaurant, Dish } from '@/types';

export function useRestaurant(id: string) {
  return useQuery<Restaurant>({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await restaurantApi.getById(id);
      return response.data ?? response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRestaurantDishes(id: string) {
  return useQuery<Dish[]>({
    queryKey: ['restaurant', id, 'dishes'],
    queryFn: async () => {
      const response = await restaurantApi.getDishes(id);
      return response.data ?? response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}