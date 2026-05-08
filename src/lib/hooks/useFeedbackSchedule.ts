import { useState, useEffect, useCallback, useRef } from 'react';
import {
  useFeedbackScheduleStore,
  type PendingFeedback,
} from '@/lib/stores/feedbackScheduleStore';
import { analytics } from '@/lib/analytics';
import { MESSAGES } from '@/lib/constants/messages';
import { toast } from 'sonner';

export function useFeedbackSchedule() {
  const store = useFeedbackScheduleStore();
  const { pendingFeedbacks, addFeedback, removeFeedback } = store;
  const [dueFeedback, setDueFeedback] = useState<PendingFeedback | null>(null);
  const notifiedIds = useRef<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkDue = useCallback(() => {
    const now = Date.now();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    for (const fb of pendingFeedbacks) {
      if (now - fb.clickedAt >= TWO_HOURS_MS && !notifiedIds.current.has(fb.recommendationId)) {
        notifiedIds.current.add(fb.recommendationId);
        setDueFeedback(fb);

        analytics.track('feedback_modal_open', { recommendationId: fb.recommendationId });

        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification('AnGi nhắc bạn feedback', {
            body: `Bữa ăn ở ${fb.restaurantName} thế nào?`,
            icon: '/icon-192.png',
          });
        }

        toast.info(`Bữa ăn ở ${fb.restaurantName} thế nào?`, {
          action: { label: 'Feedback', onClick: () => setDueFeedback(fb) },
          duration: 10000,
        });

        break;
      }
    }
  }, [pendingFeedbacks]);

  // Check on mount and when pendingFeedbacks changes
  useEffect(() => {
    checkDue();

    // Poll every 60s
    intervalRef.current = setInterval(checkDue, 60_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [checkDue]);

  // Request notification permission on mount
  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const scheduleFeedback = useCallback(
    (meal: Omit<PendingFeedback, 'clickedAt'>) => {
      const entry: PendingFeedback = { ...meal, clickedAt: Date.now() };
      addFeedback(entry);
      analytics.track('feedback_scheduled', { recommendationId: meal.recommendationId });
      toast.success(MESSAGES.FEEDBACK.SCHEDULED, { duration: 3000 });
    },
    [addFeedback]
  );

  const dismissFeedback = useCallback(
    (recommendationId: string) => {
      removeFeedback(recommendationId);
      notifiedIds.current.delete(recommendationId);
      setDueFeedback(null);
    },
    [removeFeedback]
  );

  return {
    dueFeedback,
    scheduleFeedback,
    dismissFeedback,
    hasScheduledFeedback: pendingFeedbacks.length > 0,
  };
}
