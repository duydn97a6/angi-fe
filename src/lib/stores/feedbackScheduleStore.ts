import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PendingFeedback {
  recommendationId: string;
  restaurantId: string;
  dishId?: string;
  restaurantName: string;
  dishName?: string;
  clickedAt: number;
}

interface FeedbackScheduleState {
  pendingFeedbacks: PendingFeedback[];

  addFeedback: (entry: PendingFeedback) => void;
  removeFeedback: (recommendationId: string) => void;
  getDueFeedbacks: () => PendingFeedback[];
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export const useFeedbackScheduleStore = create<FeedbackScheduleState>()(
  persist(
    (set, get) => ({
      pendingFeedbacks: [],

      addFeedback: (entry) =>
        set((state) => ({
          pendingFeedbacks: [...state.pendingFeedbacks, entry],
        })),

      removeFeedback: (recommendationId) =>
        set((state) => ({
          pendingFeedbacks: state.pendingFeedbacks.filter(
            (f) => f.recommendationId !== recommendationId
          ),
        })),

      getDueFeedbacks: () => {
        const now = Date.now();
        return get().pendingFeedbacks.filter((f) => now - f.clickedAt >= TWO_HOURS_MS);
      },
    }),
    {
      name: 'angi-feedback-schedule',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ pendingFeedbacks: state.pendingFeedbacks }),
    }
  )
);
