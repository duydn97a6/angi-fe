'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContextBar } from '@/components/layout/ContextBar';
import { RecommendationGrid } from '@/components/recommendation/RecommendationGrid';
import { RefreshButton } from '@/components/recommendation/RefreshButton';
import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { useRecommendation } from '@/lib/hooks/useRecommendation';
import { useLocation } from '@/lib/hooks/useLocation';
import { useAuth } from '@/lib/hooks/useAuth';
import { recommendationApi } from '@/lib/api/recommendation';
import { feedbackApi } from '@/lib/api/feedback';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/constants/routes';
import type { RecommendationItem } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { location } = useLocation();
  const [feedbackMeal, setFeedbackMeal] = useState<FeedbackMealData | null>(null);

  const {
    data: recommendation,
    refetch,
    isLoading,
    isFetching,
    error,
  } = useRecommendation(location?.lat, location?.lng);

  const firstName = user?.name?.split(' ').pop() || 'bạn';

  const handleCardClick = async (rec: RecommendationItem, index: number) => {
    if (!recommendation) return;

    try {
      await recommendationApi.trackClick(recommendation.recommendationId, index);
    } catch {
      // Track silently, don't block user
    }

    const url =
      rec.restaurant.deliveryLinks?.grabfood ||
      rec.restaurant.deliveryLinks?.shopeefood ||
      ROUTES.RESTAURANT(rec.restaurant.id);

    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 md:mb-6">
          <h1 className="text-h2 font-medium md:text-h1">
            Chào {firstName}, trưa nay ăn gì? 👋
          </h1>
          <p className="mt-1 hidden text-body-sm text-gray-500 md:block md:text-body">
            AI đã phân tích thời tiết, vị trí và khẩu vị của bạn
          </p>
        </div>

        <div className="mb-4 md:hidden">
          <ContextBar />
        </div>

        <p className="mb-3 text-caption uppercase tracking-wider text-gray-400">
          3 gợi ý cho bạn
        </p>

        <RecommendationGrid
          recommendations={recommendation?.recommendations ?? []}
          isLoading={isLoading}
          error={error}
          onCardClick={handleCardClick}
          onRetry={handleRefresh}
        />

        <div className="mt-4 flex flex-wrap gap-2 md:mt-5 md:gap-3">
          <RefreshButton onClick={handleRefresh} loading={isFetching} />
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.push('/home/anti-filter')}
          >
            <XCircle className="h-4 w-4" />
            Không muốn ăn...
          </Button>
          <Button
            variant="primary"
            size="md"
            className="md:ml-auto"
            onClick={() => router.push(ROUTES.GROUPS)}
          >
            <Users className="h-4 w-4" />
            Rủ cả nhóm cùng quyết
          </Button>
        </div>

        <WeeklyStats />
      </div>

      {feedbackMeal && (
        <FeedbackModal
          meal={feedbackMeal}
          open={!!feedbackMeal}
          onClose={() => setFeedbackMeal(null)}
          onSubmit={async (feedback) => {
            await feedbackApi.submit(feedback);
            toast.success('Cảm ơn feedback! AI sẽ học thêm.');
          }}
        />
      )}
    </div>
  );
}

interface FeedbackMealData {
  id: string;
  restaurantName: string;
  dishName?: string;
  time: string;
  recommendationId: string;
  restaurantId: string;
  dishId?: string;
}

function WeeklyStats() {
  return (
    <div className="mt-6 rounded-md bg-gray-50 p-3 md:p-4">
      <p className="mb-2 text-caption uppercase tracking-wider text-gray-400">
        Tuần này bạn đã ăn
      </p>
      <div className="flex flex-wrap gap-3 text-body-sm">
        <span>🍜 Phở (2)</span>
        <span>🍚 Cơm (3)</span>
        <span>🥗 Salad (1)</span>
        <span className="text-yellow-700">⚠ Nhiều dầu mỡ 60%</span>
      </div>
    </div>
  );
}