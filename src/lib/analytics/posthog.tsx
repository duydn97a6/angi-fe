'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { initPerformanceTracking } from '@/lib/analytics/performance';

const PostHogContext = createContext<typeof posthog | null>(null);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

    if (!key) {
      console.log('[PostHog] No key configured, skipping initialization');
      return;
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      persistence: 'localStorage',
      autocapture: false,
      disable_session_recording: true,
    });

    // Initialize performance tracking after PostHog is ready
    initPerformanceTracking();
  }, []);

  return (
    <PostHogContext.Provider value={posthog}>{children}</PostHogContext.Provider>
  );
}

export function usePostHog() {
  const client = useContext(PostHogContext);
  return client;
}