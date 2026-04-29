'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OptionCard } from '@/components/onboarding/OptionCard';
import { StepLayout } from '@/components/onboarding/StepLayout';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

const options = [
  { value: 'north', title: 'Miền Bắc', description: 'Phở, bún chả, bún đậu...' },
  { value: 'central', title: 'Miền Trung', description: 'Bún bò Huế, mì Quảng...' },
  { value: 'south', title: 'Miền Nam', description: 'Cơm tấm, hủ tiếu, bánh mì...' },
] as const;

export default function RegionPage() {
  const router = useRouter();
  const { region, setRegion } = useOnboardingStore();
  const [selected, setSelected] = useState<(typeof options)[number]['value'] | null>(region ?? null);

  const handleNext = () => {
    if (!selected) return;
    setRegion(selected);
    router.push('/onboarding/location');
  };

  return (
    <StepLayout
      title="Bạn ở vùng miền nào?"
      description="Để AI hiểu khẩu vị của bạn hơn"
      disabled={!selected}
      onNext={handleNext}
      onBack={() => router.push('/onboarding')}
      onSkip={() => router.push('/home')}
    >
      <div className="space-y-2">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={selected === option.value}
            onClick={() => setSelected(option.value)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
