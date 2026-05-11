'use client';

import { useState } from 'react';
import { DishCard } from './DishCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import type { Dish } from '@/types';

interface DishListProps {
  dishes: Dish[];
  isLoading?: boolean;
  error?: Error | null;
  onDishClick?: (dish: Dish) => void;
  onRetry?: () => void;
}

export function DishList({ dishes, isLoading, error, onDishClick, onRetry }: DishListProps) {
  const [filter, setFilter] = useState<string | null>(null);

  if (isLoading) {
    return <LoadingState count={4} />;
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (dishes.length === 0) {
    return (
      <EmptyState
        title="Chưa có món nào"
        description="Nhà hàng chưa cập nhật thực đơn"
        icon="🍽️"
      />
    );
  }

  const categories = [...new Set(dishes.map((d) => d.category).filter((c): c is string => !!c))];
  const filtered = filter ? dishes.filter((d) => d.category === filter) : dishes;

  return (
    <div className="space-y-3">
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`rounded-full px-3 py-1 text-caption font-medium transition-colors ${
              filter === null
                ? 'bg-coral-400 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-1 text-caption font-medium transition-colors ${
                filter === cat
                  ? 'bg-coral-400 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onClick={onDishClick ? () => onDishClick(dish) : undefined}
          />
        ))}
      </div>
    </div>
  );
}