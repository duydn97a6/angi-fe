'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChipSelector } from '@/components/onboarding/ChipSelector';
import { useLocation } from '@/lib/hooks/useLocation';
import { useQueryClient } from '@tanstack/react-query';

const foodCategoryOptions = [
  { value: 'pho', label: 'Phở' },
  { value: 'com', label: 'Cơm' },
  { value: 'bun', label: 'Bún' },
  { value: 'mi', label: 'Mì' },
  { value: 'banh-mi', label: 'Bánh mì' },
  { value: 'goi-cuon', label: 'Gỏi cuốn' },
  { value: 'xia-lo', label: 'Xì dầu' },
  { value: 'chao', label: 'Cháo' },
];

const moodOptions = [
  { value: 'no-spicy', label: 'Không cay' },
  { value: 'no-greasy', label: 'Không dầu mỡ' },
  { value: 'no-soup', label: 'Không nước' },
  { value: 'no-heavy', label: 'Không no nặng' },
];

const originOptions = [
  { value: 'no-vietnamese', label: 'Không món Việt' },
  { value: 'no-korean', label: 'Không Hàn' },
  { value: 'no-japanese', label: 'Không Nhật' },
  { value: 'no-chinese', label: 'Không Hoa' },
  { value: 'no-western', label: 'Không Âu' },
];

const preferenceOptions = [
  { value: 'no-complicated', label: 'Không muốn phức tạp' },
  { value: 'no-expensive', label: 'Không muốn đắt' },
  { value: 'no-far', label: 'Không muốn đi xa' },
  { value: 'no-slow', label: 'Không muốn chờ lâu' },
];

export default function AntiFilterPage() {
  const router = useRouter();
  const { location } = useLocation();
  const queryClient = useQueryClient();

  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [excludedMoods, setExcludedMoods] = useState<string[]>([]);
  const [excludedOrigins, setExcludedOrigins] = useState<string[]>([]);
  const [excludedPrefs, setExcludedPrefs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalExcluded = excludedFoods.length + excludedMoods.length + excludedOrigins.length + excludedPrefs.length;

  const handleApply = async () => {
    setIsSubmitting(true);
    // Invalidate recommendation query to force refresh with new context
    queryClient.invalidateQueries({
      queryKey: ['recommendation', location?.lat, location?.lng],
    });
    // Small delay for UX feedback
    setTimeout(() => {
      router.push('/home');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Quay lại"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-body font-medium">Không muốn ăn...</h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-5">
        <p className="mb-6 text-body-sm text-gray-500">
          Chọn những thứ bạn KHÔNG muốn, AI sẽ gợi ý món khác phù hợp hơn
        </p>

        <section className="mb-6">
          <h2 className="mb-3 text-body font-medium text-gray-900">Loại món</h2>
          <ChipSelector
            options={foodCategoryOptions}
            selected={excludedFoods}
            onChange={setExcludedFoods}
          />
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-body font-medium text-gray-900">Cảm giác</h2>
          <ChipSelector
            options={moodOptions}
            selected={excludedMoods}
            onChange={setExcludedMoods}
          />
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-body font-medium text-gray-900">Xuất xứ</h2>
          <ChipSelector
            options={originOptions}
            selected={excludedOrigins}
            onChange={setExcludedOrigins}
          />
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-body font-medium text-gray-900">Mong muốn</h2>
          <ChipSelector
            options={preferenceOptions}
            selected={excludedPrefs}
            onChange={setExcludedPrefs}
          />
        </section>

        <Button
          fullWidth
          size="lg"
          onClick={handleApply}
          loading={isSubmitting}
          disabled={totalExcluded === 0}
        >
          Áp dụng{totalExcluded > 0 ? ` (${totalExcluded} bộ lọc)` : ''}
        </Button>

        {totalExcluded === 0 && (
          <p className="mt-2 text-center text-caption text-gray-400">
            Chọn ít nhất 1 mục để lọc
          </p>
        )}
      </div>
    </div>
  );
}