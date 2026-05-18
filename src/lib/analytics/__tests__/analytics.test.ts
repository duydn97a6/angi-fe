import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '@/lib/analytics';

// Mock posthog-js
vi.mock('posthog-js', () => ({
  default: {
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
  },
  __esModule: true,
}));

describe('analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset env for each test
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key';
  });

  it('track calls posthog.capture when enabled', async () => {
    const posthog = await import('posthog-js');
    analytics.track('test_event', { foo: 'bar' });
    expect(posthog.default.capture).toHaveBeenCalledWith('test_event', { foo: 'bar' });
  });

  it('identify calls posthog.identify', async () => {
    const posthog = await import('posthog-js');
    analytics.identify('user-123', { name: 'Test' });
    expect(posthog.default.identify).toHaveBeenCalledWith('user-123', { name: 'Test' });
  });

  it('reset calls posthog.reset', async () => {
    const posthog = await import('posthog-js');
    analytics.reset();
    expect(posthog.default.reset).toHaveBeenCalled();
  });

  it('trackPageView captures page view event', async () => {
    const posthog = await import('posthog-js');
    analytics.trackPageView('/home');
    expect(posthog.default.capture).toHaveBeenCalledWith('$pageview', {
      $current_url: '/home',
    });
  });

  it('trackError captures error event', async () => {
    const posthog = await import('posthog-js');
    const error = new Error('test error');
    analytics.trackError(error, { context: 'test' });
    expect(posthog.default.capture).toHaveBeenCalledWith('error', {
      $exception_message: 'test error',
      $exception_stack: error.stack,
      context: 'test',
    });
  });
});