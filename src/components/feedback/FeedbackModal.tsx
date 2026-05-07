'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { EmojiSelector } from './EmojiSelector';
import { RegretSelector } from './RegretSelector';
import { ChipSelector } from '@/components/onboarding/ChipSelector';

interface FeedbackMeal {
  id: string;
  restaurantName: string;
  dishName?: string;
  time: string;
  recommendationId: string;
  restaurantId: string;
  dishId?: string;
}

interface FeedbackModalProps {
  meal: FeedbackMeal;
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    recommendationId: string;
    restaurantId: string;
    dishId?: string;
    emoji: string;
    regretLevel: 'none' | 'slight' | 'high';
    tags: string[];
    notes?: string;
  }) => Promise<void>;
}

const tagOptions = [
  { value: 'delicious', label: 'Ngon' },
  { value: 'cheap', label: 'Rẻ' },
  { value: 'fast', label: 'Nhanh' },
  { value: 'near', label: 'Gần' },
  { value: 'dirty', label: 'Dơ' },
  { value: 'expensive', label: 'Đắt' },
];

export function FeedbackModal({ meal, open, onClose, onSubmit }: FeedbackModalProps) {
  const [emoji, setEmoji] = useState<'sad' | 'neutral' | 'happy' | null>(null);
  const [regretLevel, setRegretLevel] = useState<'none' | 'slight' | 'high' | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const canSubmit = emoji !== null;

  const handleSubmit = async () => {
    if (!emoji) return;
    setLoading(true);
    try {
      await onSubmit({
        recommendationId: meal.recommendationId,
        restaurantId: meal.restaurantId,
        dishId: meal.dishId,
        emoji,
        regretLevel: regretLevel ?? 'none',
        tags,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-xl bg-white p-5 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:right-auto md:w-[480px] md:rounded-xl">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 md:hidden" />

          <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-coral-50 text-lg">
              🍚
            </div>
            <div>
              <div className="text-body font-medium">{meal.restaurantName}</div>
              <div className="text-caption text-gray-400">Ăn lúc {meal.time}</div>
            </div>
          </div>

          <Dialog.Title className="text-h2 font-medium">
            Bữa vừa rồi thế nào?
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-body-sm text-gray-500">
            Feedback giúp AI hiểu bạn hơn
          </Dialog.Description>

          <EmojiSelector value={emoji} onChange={setEmoji} />

          {emoji && (
            <>
              <h4 className="mb-2 mt-5 text-body font-medium">Bạn có hối hận không?</h4>
              <RegretSelector value={regretLevel} onChange={setRegretLevel} />

              <h4 className="mb-2 mt-5 text-body font-medium">Lý do (không bắt buộc)</h4>
              <ChipSelector options={tagOptions} selected={tags} onChange={setTags} />
            </>
          )}

          <Button
            fullWidth
            className="mt-6"
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={loading}
          >
            Gửi feedback
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}