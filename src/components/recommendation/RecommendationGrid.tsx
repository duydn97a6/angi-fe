'use client';

import { RecommendationCard } from './RecommendationCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { RecommendationItem } from '@/types';

interface RecommendationGridProps {
  recommendations: RecommendationItem[];
  isLoading?: boolean;
  error?: Error | null;
  onCardClick: (rec: RecommendationItem, index: number) => void;
  onRetry?: () => void;
}

export function RecommendationGrid({
  recommendations,
  isLoading,
  error,
  onCardClick,
  onRetry,
}: RecommendationGridProps) {
  if (isLoading) {
    return <LoadingState count={3} />;
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (recommendations.length === 0) {
    return (
      <EmptyState
        title="Chưa có quán nào gần đây"
        description="Thử mở rộng khu vực tìm kiếm?"
        icon="📍"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {recommendations.map((rec, i) => (
        <RecommendationCard
          key={`${rec.restaurant.id}-${i}`}
          recommendation={rec}
          isFeatured={rec.isTopPick || rec.category === 'familiar'}
          onClick={() => onCardClick(rec, i)}
        />
      ))}
    </div>
  );
}