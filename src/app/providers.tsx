'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/queryClient';
import { PostHogProvider } from '@/lib/analytics/posthog';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        {children}
      </PostHogProvider>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}