'use client';

import { useState, useRef } from 'react';
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
import { useSubmitFeedback, useMealStats } from '@/lib/hooks/useMealHistory';
import { useFeedbackSchedule } from '@/lib/hooks/useFeedbackSchedule';
import { recommendationApi } from '@/lib/api/recommendation';
import { analytics } from '@/lib/analytics';
import { MESSAGES } from '@/lib/constants/messages';
import { ROUTES } from '@/lib/constants/routes';
import { toast } from 'sonner';
import type { RecommendationItem } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { location } = useLocation();
  const { dueFeedback, scheduleFeedback, dismissFeedback } = useFeedbackSchedule();
  const submitFeedback = useSubmitFeedback();

  const [feedbackMeal, setFeedbackMeal] = useState<FeedbackMealData | null>(null);
  const lastSubmittedFeedback = useRef<{
    recommendationId: string;
    restaurantId: string;
    dishId?: string;
    emoji: string;
    regretLevel: 'none' | 'slight' | 'high';
    tags: string[];
  } | null>(null);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    analytics.track('card_click', {
      recommendationId: recommendation.recommendationId,
      restaurantId: rec.restaurant.id,
      category: rec.category,
      index,
    });

    try {
      await recommendationApi.trackClick(recommendation.recommendationId, index);
    } catch {
      // Track silently, don't block user
    }

    scheduleFeedback({
      recommendationId: recommendation.recommendationId,
      restaurantId: rec.restaurant.id,
      dishId: rec.dish?.id,
      restaurantName: rec.restaurant.name,
      dishName: rec.dish?.name,
    });

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
    analytics.track('recommendation_refresh');
    refetch();
  };

  // Use dueFeedback from schedule as the trigger
  const activeFeedbackMeal = feedbackMeal || (dueFeedback ? {
    id: dueFeedback.recommendationId,
    restaurantName: dueFeedback.restaurantName,
    dishName: dueFeedback.dishName,
    time: new Date(dueFeedback.clickedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    recommendationId: dueFeedback.recommendationId,
    restaurantId: dueFeedback.restaurantId,
    dishId: dueFeedback.dishId,
  } : null);

  const handleFeedbackClose = () => {
    setFeedbackMeal(null);
    if (dueFeedback) {
      dismissFeedback(dueFeedback.recommendationId);
    }
  };

  const handleFeedbackSubmit = async (feedback: {
    recommendationId: string;
    restaurantId: string;
    dishId?: string;
    emoji: string;
    regretLevel: 'none' | 'slight' | 'high';
    tags: string[];
  }) => {
    lastSubmittedFeedback.current = feedback;
    await submitFeedback.mutateAsync(feedback);
    handleFeedbackClose();

    // Show undo toast
    const toastId = toast(MESSAGES.FEEDBACK.UNDO, {
      action: {
        label: 'Hoàn tác',
        onClick: () => {
          // Clear auto-dismiss timeout
          if (undoTimeoutRef.current) {
            clearTimeout(undoTimeoutRef.current);
          }
          // Re-open feedback modal with previous values pre-filled
          if (lastSubmittedFeedback.current) {
            const fb = lastSubmittedFeedback.current;
            setFeedbackMeal({
              id: fb.recommendationId,
              restaurantName: activeFeedbackMeal?.restaurantName ?? '',
              dishName: activeFeedbackMeal?.dishName,
              time: activeFeedbackMeal?.time ?? '',
              recommendationId: fb.recommendationId,
              restaurantId: fb.restaurantId,
              dishId: fb.dishId,
            });
          }
          lastSubmittedFeedback.current = null;
          toast.dismiss(toastId);
          analytics.track('feedback_undo');
        },
      },
      duration: 10000,
    });

    // Auto-dismiss undo after 10s
    undoTimeoutRef.current = setTimeout(() => {
      lastSubmittedFeedback.current = null;
    }, 10000);
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

      {activeFeedbackMeal && (
        <FeedbackModal
          meal={activeFeedbackMeal}
          open={!!activeFeedbackMeal}
          onClose={handleFeedbackClose}
          onSubmit={handleFeedbackSubmit}
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
  const { data: stats } = useMealStats({ period: 'week' });

  if (!stats) return null;

  return (
    <div className="mt-6 rounded-md bg-gray-50 p-3 md:p-4">
      <p className="mb-2 text-caption uppercase tracking-wider text-gray-400">
        Tuần này bạn đã ăn
      </p>
      <div className="flex flex-wrap gap-3 text-body-sm">
        {stats.topDishes?.map((d) => (
          <span key={d.name}>
            🍚 {d.name} ({d.count})
          </span>
        ))}
        {(!stats.topDishes || stats.topDishes.length === 0) && (
          <span className="text-gray-400">Chưa có dữ liệu</span>
        )}
        {stats.healthPattern?.warning && (
          <span className="text-yellow-700">⚠ {stats.healthPattern.warning}</span>
        )}
      </div>
    </div>
  );
}
