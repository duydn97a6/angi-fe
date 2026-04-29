'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/utils/validation';

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = form.handleSubmit(() => {
    toast.success('Nếu email tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn');
  });

  return (
    <Card className="p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-h1 text-gray-900">Quên mật khẩu?</h2>
        <p className="mt-1 text-body-sm text-gray-500">Nhập email để nhận hướng dẫn đặt lại mật khẩu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={form.formState.errors.email?.message}
          {...form.register('email')}
        />

        <Button type="submit" fullWidth>
          Gửi hướng dẫn
        </Button>
      </form>

      <p className="mt-5 text-center text-body-sm text-gray-500">
        Nhớ mật khẩu rồi?{' '}
        <Link href="/login" className="font-medium text-coral-400 hover:text-coral-600">
          Đăng nhập
        </Link>
      </p>
    </Card>
  );
}
