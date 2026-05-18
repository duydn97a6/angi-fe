'use client';

import { Suspense } from 'react';
import { usePageView } from '@/lib/hooks/usePageView';
import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

function PageViewTrackerInner() {
  usePageView();

  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      analytics.identify(user.id, {
        email: user.email,
        name: user.name,
        isOnboarded: user.isOnboarded,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}