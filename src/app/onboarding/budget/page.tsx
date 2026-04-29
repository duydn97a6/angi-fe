'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OptionCard } from '@/components/onboarding/OptionCard';
import { StepLayout } from '@/components/onboarding/StepLayout';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

const budgetOptions = [
  { min: 30000, max: 50000, title: 'Tiết kiệm', description: '30.000đ - 50.000đ' },
  { min: 50000, max: 80000, title: 'Phổ biến', description: '50.000đ - 80.000đ' },
  { min: 80000, max: 120000, title: 'Thoải mái', description: '80.000đ - 120.000đ' },
  { min: 120000, max: 200000, title: 'Premium', description: '120.000đ - 200.000đ' },
];

export default function BudgetPage() {
  const router = useRouter();
  const { budgetMin, budgetMax, setBudget } = useOnboardingStore();
  const [selected, setSelected] = useState(() => {
    const current = budgetOptions.find((option) => option.min === budgetMin && option.max === budgetMax);
    return current ? `${current.min}-${current.max}` : '';
  });

  const handleNext = () => {
    const option = budgetOptions.find((item) => `${item.min}-${item.max}` === selected);
    if (!option) return;
    setBudget(option.min, option.max);
    router.push('/onboarding/finish');
  };

  return (
    <StepLayout
      title="Ngân sách mỗi bữa?"
      description="AI sẽ ưu tiên gợi ý phù hợp túi tiền của bạn"
      disabled={!selected}
      onNext={handleNext}
      onSkip={() => router.push('/home')}
    >
      <div className="space-y-2">
        {budgetOptions.map((option) => {
          const value = `${option.min}-${option.max}`;

          return (
            <OptionCard
              key={value}
              title={option.title}
              description={option.description}
              selected={selected === value}
              onClick={() => setSelected(value)}
            />
          );
        })}
      </div>
    </StepLayout>
  );
}
