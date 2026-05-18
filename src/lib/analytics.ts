import posthog from 'posthog-js';

type Properties = Record<string, unknown>;

function isEnabled(): boolean {
  return typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_POSTHOG_KEY;
}

function capture(event: string, properties?: Properties) {
  if (!isEnabled()) {
    if (typeof window !== 'undefined') console.log('[Analytics]', event, properties);
    return;
  }
  posthog.capture(event, properties);
}

function identify(userId: string, properties?: Properties) {
  if (!isEnabled()) return;
  posthog.identify(userId, properties);
}

function reset() {
  if (!isEnabled()) return;
  posthog.reset();
}

function trackPageView(url?: string) {
  if (!isEnabled()) return;
  posthog.capture('$pageview', { $current_url: url || window.location.href });
}

function trackError(error: Error, properties?: Properties) {
  if (!isEnabled()) {
    console.error('[Analytics Error]', error, properties);
    return;
  }
  posthog.capture('error', {
    $exception_message: error.message,
    $exception_stack: error.stack,
    ...properties,
  });
}

export const analytics = {
  track: capture,
  identify,
  reset,
  trackPageView,
  trackError,
};