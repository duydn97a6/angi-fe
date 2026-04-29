'use client';

import { useMutation } from '@tanstack/react-query';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { userApi } from '@/lib/api/user';
import { useAuthStore } from '@/lib/stores/authStore';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

export default function FinishPage() {
  const router = useRouter();
  const getPayload = useOnboardingStore((state) => state.getPayload);
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const completeMutation = useMutation({
    mutationFn: userApi.completeOnboarding,
    onSuccess: () => {
      if (user) {
        setUser({ ...user, isOnboarded: true, preferences: getPayload() });
      }
      resetOnboarding();
      toast.success('Hoàn tất onboarding');
      router.push('/home');
    },
    onError: () => {
      toast.error('Không thể hoàn tất onboarding, vui lòng thử lại');
    },
  });

  const handleComplete = () => {
    completeMutation.mutate(getPayload());
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col justify-center text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-greenie-100">
        <CheckCircle2 className="h-9 w-9 text-greenie-600" />
      </div>
      <h1 className="text-h1 text-gray-900">Sẵn sàng ăn ngon rồi!</h1>
      <p className="mt-3 text-body text-gray-500">
        AnGi đã có đủ thông tin ban đầu để gợi ý món phù hợp hơn cho bạn.
      </p>
      <div className="mt-6 rounded-md bg-coral-50 p-4 text-left text-body-sm text-coral-800">
        🎉 Confetti placeholder: hiệu ứng chúc mừng sẽ được thêm khi tích hợp animation package.
      </div>
      <Button className="mt-8" fullWidth loading={completeMutation.isPending} onClick={handleComplete}>
        Hoàn tất và vào trang chủ
      </Button>
    </div>
  );
}
