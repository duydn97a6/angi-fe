import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealApi } from '@/lib/api/meal';
import { feedbackApi } from '@/lib/api/feedback';
import { toast } from 'sonner';
import { MESSAGES } from '@/lib/constants/messages';
import { analytics } from '@/lib/analytics';
import type { MealHistoryEntry, MealStats } from '@/types';

export function useMealHistory(params?: { days?: number }) {
  return useQuery<MealHistoryEntry[]>({
    queryKey: ['meals', 'history', params],
    queryFn: async () => {
      const response = await mealApi.getHistory(params);
      return response.data ?? response;
    },
  });
}

export function useMealStats(params?: { period?: string }) {
  return useQuery<MealStats>({
    queryKey: ['meals', 'stats', params],
    queryFn: async () => {
      const response = await mealApi.getStats(params);
      return response.data ?? response;
    },
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackApi.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      toast.success(MESSAGES.FEEDBACK.SUCCESS);
      analytics.track('feedback_submitted');
    },
    onError: () => {
      toast.error(MESSAGES.FEEDBACK.ERROR);
      analytics.track('feedback_error');
    },
  });
}