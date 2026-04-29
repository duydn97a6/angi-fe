'use client';

import { useRouter } from 'next/navigation';
import { Mascot } from '@/components/shared/Mascot';
import { Button } from '@/components/ui/button';

export default function OnboardingIntroPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col justify-center text-center">
      <div className="mb-5 flex justify-center">
        <Mascot mood="happy" size="lg" />
      </div>
      <h1 className="text-h1 text-gray-900">Cá nhân hóa gợi ý món ăn</h1>
      <p className="mt-3 text-body text-gray-500">
        Trả lời vài câu hỏi nhanh để AnGi hiểu khẩu vị, vị trí và ngân sách của bạn hơn.
      </p>
      <div className="mt-8 space-y-3 text-left text-body-sm text-gray-600">
        <div className="rounded-md bg-gray-50 p-3">📍 Tìm quán gần văn phòng</div>
        <div className="rounded-md bg-gray-50 p-3">🥗 Tránh món bạn không ăn</div>
        <div className="rounded-md bg-gray-50 p-3">💸 Gợi ý đúng ngân sách</div>
      </div>
      <Button className="mt-8" fullWidth onClick={() => router.push('/onboarding/region')}>
        Bắt đầu
      </Button>
      <button type="button" className="mt-3 text-caption text-gray-400" onClick={() => router.push('/home')}>
        Bỏ qua onboarding
      </button>
    </div>
  );
}
