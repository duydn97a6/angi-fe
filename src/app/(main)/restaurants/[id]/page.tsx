'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { RestaurantDetail, RestaurantDetailSkeleton } from '@/components/restaurant/RestaurantDetail';
import { DishList } from '@/components/restaurant/DishList';
import { ErrorState } from '@/components/shared/ErrorState';
import { useRestaurant, useRestaurantDishes } from '@/lib/hooks/useRestaurant';
import { analytics } from '@/lib/analytics';
import type { Dish } from '@/types';

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError, refetch } = useRestaurant(id);
  const { data: dishes, isLoading: dishesLoading, error: dishesError, refetch: refetchDishes } = useRestaurantDishes(id);

  analytics.track('restaurant_view', { restaurantId: id });

  const handleDishClick = (dish: Dish) => {
    analytics.track('dish_click', {
      restaurantId: id,
      dishId: dish.id,
      dishName: dish.name,
    });
  };

  if (restaurantError) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto max-w-4xl">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1 text-body-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>

        {/* Restaurant detail */}
        {restaurantLoading || !restaurant ? (
          <RestaurantDetailSkeleton />
        ) : (
          <RestaurantDetail restaurant={restaurant} />
        )}

        {/* Menu section */}
        <div className="mt-6">
          <h2 className="mb-3 text-h3 font-medium text-gray-900">Thực đơn</h2>
          <DishList
            dishes={dishes ?? []}
            isLoading={dishesLoading}
            error={dishesError}
            onDishClick={handleDishClick}
            onRetry={() => refetchDishes()}
          />
        </div>
      </div>
    </div>
  );
}