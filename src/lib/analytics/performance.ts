'use client';

import { analytics } from '@/lib/analytics';

type MetricName = 'LCP' | 'FID' | 'CLS' | 'INP' | 'TTFB' | 'FCP';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

function getRating(name: MetricName, value: number): PerformanceMetric['rating'] {
  const thresholds: Record<MetricName, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    TTFB: [800, 1800],
    FCP: [1800, 3000],
  };

  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

export function initPerformanceTracking() {
  if (typeof window === 'undefined') return;

  // Track navigation timing for TTFB
  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navEntry) {
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      analytics.track('web_vital', {
        name: 'TTFB',
        value: Math.round(ttfb),
        rating: getRating('TTFB', ttfb),
        url: window.location.href,
      });

      const fcp = navEntry.loadEventEnd - navEntry.startTime;
      if (fcp > 0) {
        analytics.track('web_vital', {
          name: 'FCP',
          value: Math.round(fcp),
          rating: getRating('FCP', fcp),
          url: window.location.href,
        });
      }
    }
  } catch {
    // Performance API not supported
  }

  // Use PerformanceObserver for LCP, FID, CLS, INP
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const value = entry.startTime;
          analytics.track('web_vital', {
            name: 'LCP',
            value: Math.round(value),
            rating: getRating('LCP', value),
            url: window.location.href,
          });
        }

        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming;
          const value = fidEntry.processingStart - fidEntry.startTime;
          analytics.track('web_vital', {
            name: 'FID',
            value: Math.round(value),
            rating: getRating('FID', value),
            url: window.location.href,
          });
        }

        if (entry.entryType === 'layout-shift' && !(entry as LayoutShift).hadRecentInput) {
          const clsValue = (entry as LayoutShift).value;
          analytics.track('web_vital', {
            name: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            rating: getRating('CLS', clsValue),
            url: window.location.href,
          });
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    observer.observe({ type: 'first-input', buffered: true });
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // PerformanceObserver not supported
  }
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

// Track API response times
export function trackApiCall(endpoint: string, duration: number, status: number) {
  analytics.track('api_response', {
    endpoint,
    duration: Math.round(duration),
    status,
    rating: duration < 1000 ? 'good' : duration < 3000 ? 'needs-improvement' : 'poor',
  });
}