const analytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    console.log('[Analytics]', event, properties);
    // PostHog integration point
  },
};

export { analytics };
