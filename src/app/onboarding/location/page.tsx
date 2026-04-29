'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/onboarding/StepLayout';
import { Input } from '@/components/ui/input';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { cn } from '@/lib/utils/cn';

const radiusOptions = [500, 1000, 2000];

export default function LocationPage() {
  const router = useRouter();
  const { office, setLocation } = useOnboardingStore();
  const [address, setAddress] = useState(office?.address ?? '');
  const [radius, setRadius] = useState(office?.radius ?? 1000);

  const hasAddress = address.trim().length >= 5;

  const handleNext = () => {
    if (!hasAddress) return;
    setLocation({
      lat: office?.lat ?? 10.7769,
      lng: office?.lng ?? 106.7009,
      address: address.trim(),
      radius,
    });
    router.push('/onboarding/diet');
  };

  return (
    <StepLayout
      title="Văn phòng bạn ở đâu?"
      description="AI sẽ tìm quán ăn quanh đây"
      disabled={!hasAddress}
      onNext={handleNext}
      onBack={() => router.push('/onboarding/region')}
      onSkip={() => router.push('/home')}
    >
      <Input
        label="Địa chỉ"
        placeholder="Ví dụ: Quận 1, TP. Hồ Chí Minh"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <div className="mt-4 flex h-[250px] flex-col items-center justify-center rounded-md bg-gray-100 text-center text-body-sm text-gray-400">
        <MapPin className="mb-2 h-8 w-8 text-coral-400" />
        <span>Map widget placeholder</span>
        <span className="mt-1 text-caption">Google Maps/Places sẽ được kết nối khi có API key</span>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-body font-medium text-gray-900">Bán kính tìm quán ăn</p>
        <div className="flex gap-2">
          {radiusOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRadius(option)}
              className={cn(
                'flex-1 rounded-md border py-2 text-body-sm transition-all',
                radius === option
                  ? 'border-coral-400 bg-coral-50 font-medium text-coral-800'
                  : 'border-gray-200 bg-white text-gray-700'
              )}
            >
              {option < 1000 ? `${option}m` : `${option / 1000}km`}
            </button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}
