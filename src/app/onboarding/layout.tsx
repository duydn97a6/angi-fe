'use client';

import { usePathname } from 'next/navigation';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const steps = ['region', 'location', 'diet', 'budget', 'finish'];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStep = steps.findIndex((step) => pathname.includes(step)) + 1;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 py-6">
        {currentStep > 0 && (
          <div className="mb-6">
            <ProgressBar current={currentStep} total={steps.length} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
