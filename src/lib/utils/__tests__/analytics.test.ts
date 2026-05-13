import { describe, it, expect, vi } from 'vitest';
import { analytics } from '@/lib/analytics';

describe('analytics', () => {
  it('calls console.log on track', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    analytics.track('test_event', { key: 'value' });
    expect(spy).toHaveBeenCalledWith('[Analytics]', 'test_event', { key: 'value' });
    spy.mockRestore();
  });

  it('does not throw when called without properties', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => analytics.track('test_event')).not.toThrow();
    spy.mockRestore();
  });
});