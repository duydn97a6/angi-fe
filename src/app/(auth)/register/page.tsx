'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/authStore';
import { registerSchema, type RegisterFormValues } from '@/lib/utils/validation';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      toast.success('Đăng ký thành công');
      router.push('/onboarding');
    },
    onError: () => {
      toast.error('Không thể đăng ký tài khoản');
    },
  });

  const handleSubmit = form.handleSubmit((values) => registerMutation.mutate(values));

  return (
    <Card className="p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-h1 text-gray-900">Tạo tài khoản</h2>
        <p className="mt-1 text-body-sm text-gray-500">Chỉ mất 1 phút để AI bắt đầu hiểu khẩu vị của bạn.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Tên của bạn"
          placeholder="Duy"
          error={form.formState.errors.name?.message}
          {...form.register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={form.formState.errors.email?.message}
          {...form.register('email')}
        />
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          error={form.formState.errors.password?.message}
          {...form.register('password')}
        />

        <Button type="submit" fullWidth loading={registerMutation.isPending}>
          Đăng ký
        </Button>
      </form>

      <p className="mt-5 text-center text-body-sm text-gray-500">
        Đã có tài khoản?{' '}
        <Link href="/login" className="font-medium text-coral-400 hover:text-coral-600">
          Đăng nhập
        </Link>
      </p>
    </Card>
  );
}
