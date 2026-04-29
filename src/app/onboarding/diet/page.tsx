'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChipSelector } from '@/components/onboarding/ChipSelector';
import { StepLayout } from '@/components/onboarding/StepLayout';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

const foodOptions = [
  { value: 'seafood', label: 'Hải sản' },
  { value: 'beef', label: 'Thịt bò' },
  { value: 'pork', label: 'Thịt heo' },
  { value: 'spicy', label: 'Đồ cay' },
  { value: 'fried', label: 'Đồ chiên' },
  { value: 'offal', label: 'Lòng/nội tạng' },
  { value: 'cilantro', label: 'Rau mùi' },
  { value: 'peanut', label: 'Đậu phộng' },
  { value: 'dairy', label: 'Sữa' },
];

const dietOptions = [
  { value: 'normal', label: 'Ăn bình thường' },
  { value: 'vegetarian', label: 'Ăn chay' },
  { value: 'vegan', label: 'Thuần chay' },
  { value: 'healthy', label: 'Healthy' },
];

export default function DietPage() {
  const router = useRouter();
  const { excludedFoods, dietType, setExcludedFoods, setDietType } = useOnboardingStore();
  const [excluded, setExcluded] = useState<string[]>(excludedFoods ?? []);
  const [selectedDiet, setSelectedDiet] = useState<string[]>(dietType ? [dietType] : ['normal']);

  const handleNext = () => {
    setExcludedFoods(excluded);
    setDietType(selectedDiet[0] as 'normal' | 'vegetarian' | 'vegan' | 'healthy');
    router.push('/onboarding/budget');
  };

  return (
    <StepLayout
      title="Có món nào bạn KHÔNG ăn?"
      description="Chọn tất cả mục phù hợp và chế độ ăn của bạn"
      onNext={handleNext}
      onSkip={() => router.push('/home')}
    >
      <div>
        <p className="mb-2 text-body font-medium text-gray-900">Món cần tránh</p>
        <ChipSelector options={foodOptions} selected={excluded} onChange={setExcluded} />
      </div>
      <div className="mt-6">
        <p className="mb-2 text-body font-medium text-gray-900">Chế độ ăn</p>
        <ChipSelector options={dietOptions} selected={selectedDiet} onChange={setSelectedDiet} multi={false} />
      </div>
    </StepLayout>
  );
}
