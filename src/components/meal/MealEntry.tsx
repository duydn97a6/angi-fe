'use client';

import { formatPrice, formatTime } from '@/lib/utils/format';
import type { MealHistoryEntry } from '@/types';

interface MealEntryProps {
  meal: MealHistoryEntry;
  onClick?: (meal: MealHistoryEntry) => void;
}

const emojiMap: Record<string, string> = {
  sad: '😕',
  neutral: '😐',
  happy: '😋',
};

export function MealEntry({ meal, onClick }: MealEntryProps) {
  const feedbackEmoji = meal.feedback?.emoji
    ? emojiMap[meal.feedback.emoji] ?? meal.feedback.emoji
    : null;

  return (
    <button
      type="button"
      onClick={onClick ? () => onClick(meal) : undefined}
      className="w-full rounded-md border border-gray-100 bg-white p-3 text-left transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base" aria-hidden>🍚</span>
            <span className="truncate text-body font-medium text-gray-900">
              {meal.dish?.name ?? meal.restaurant.name}
            </span>
          </div>
          <p className="mt-0.5 text-caption text-gray-400">
            {formatTime(meal.mealAt)}
            {meal.pricePaid != null && ` • ${formatPrice(meal.pricePaid)}`}
          </p>
          {meal.feedback?.tags && meal.feedback.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {meal.feedback.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {feedbackEmoji && (
          <span className="text-lg" aria-label={`Đánh giá: ${meal.feedback!.emoji}`}>
            {feedbackEmoji}
          </span>
        )}
      </div>
    </button>
  );
}