'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/authStore';
import { loginSchema, type LoginFormValues } from '@/lib/utils/validation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const next = searchParams.get('next') || '/home';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, {
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      });
      toast.success('Đăng nhập thành công');
      router.push(data.user?.isOnboarded ? next : '/onboarding');
    },
    onError: () => {
      toast.error('Email hoặc mật khẩu không đúng');
    },
  });

  const handleSubmit = form.handleSubmit((values) => loginMutation.mutate(values));

  const handleGoogleLogin = async () => {
    toast.info('Google OAuth sẽ được kết nối khi có client id');
  };

  return (
    <Card className="p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-h1 text-gray-900">Đăng nhập</h2>
        <p className="mt-1 text-body-sm text-gray-500">Quay lại để AI gợi ý món ngon hôm nay.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="••••••••"
          error={form.formState.errors.password?.message}
          {...form.register('password')}
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-body-sm text-coral-400 hover:text-coral-600">
            Quên mật khẩu?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={loginMutation.isPending}>
          Đăng nhập
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-caption text-gray-400">hoặc</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <Button type="button" variant="secondary" fullWidth onClick={handleGoogleLogin}>
        Tiếp tục với Google
      </Button>

      <p className="mt-5 text-center text-body-sm text-gray-500">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-medium text-coral-400 hover:text-coral-600">
          Đăng ký
        </Link>
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Card className="h-96 p-5 shadow-sm" />}>
      <LoginContent />
    </Suspense>
  );
}
