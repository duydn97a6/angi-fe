import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFeedbackScheduleStore, type PendingFeedback } from '../feedbackScheduleStore';

describe('feedbackScheduleStore', () => {
  beforeEach(() => {
    useFeedbackScheduleStore.setState({ pendingFeedbacks: [] });
  });

  it('starts with empty pending feedbacks', () => {
    expect(useFeedbackScheduleStore.getState().pendingFeedbacks).toEqual([]);
  });

  it('adds a feedback entry', () => {
    const entry: PendingFeedback = {
      recommendationId: 'rec-1',
      restaurantId: 'rest-1',
      restaurantName: 'Quán A',
      dishName: 'Bún chả',
      clickedAt: Date.now(),
    };

    useFeedbackScheduleStore.getState().addFeedback(entry);
    expect(useFeedbackScheduleStore.getState().pendingFeedbacks).toHaveLength(1);
    expect(useFeedbackScheduleStore.getState().pendingFeedbacks[0].recommendationId).toBe('rec-1');
  });

  it('removes a feedback entry', () => {
    const entry: PendingFeedback = {
      recommendationId: 'rec-1',
      restaurantId: 'rest-1',
      restaurantName: 'Quán A',
      clickedAt: Date.now(),
    };

    useFeedbackScheduleStore.getState().addFeedback(entry);
    useFeedbackScheduleStore.getState().addFeedback({
      ...entry,
      recommendationId: 'rec-2',
    });

    useFeedbackScheduleStore.getState().removeFeedback('rec-1');
    const remaining = useFeedbackScheduleStore.getState().pendingFeedbacks;
    expect(remaining).toHaveLength(1);
    expect(remaining[0].recommendationId).toBe('rec-2');
  });

  it('returns due feedbacks after 2 hours', () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    const recentClick = Date.now() - 30 * 60 * 1000;

    useFeedbackScheduleStore.getState().addFeedback({
      recommendationId: 'rec-old',
      restaurantId: 'rest-1',
      restaurantName: 'Quán cũ',
      clickedAt: twoHoursAgo,
    });

    useFeedbackScheduleStore.getState().addFeedback({
      recommendationId: 'rec-new',
      restaurantId: 'rest-2',
      restaurantName: 'Quán mới',
      clickedAt: recentClick,
    });

    const due = useFeedbackScheduleStore.getState().getDueFeedbacks();
    expect(due).toHaveLength(1);
    expect(due[0].recommendationId).toBe('rec-old');
  });

  it('returns empty array when no feedbacks are due', () => {
    const recentClick = Date.now() - 30 * 60 * 1000;

    useFeedbackScheduleStore.getState().addFeedback({
      recommendationId: 'rec-1',
      restaurantId: 'rest-1',
      restaurantName: 'Quán A',
      clickedAt: recentClick,
    });

    const due = useFeedbackScheduleStore.getState().getDueFeedbacks();
    expect(due).toHaveLength(0);
  });
});