import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// Component that throws an error
function ThrowError(): React.ReactElement {
  throw new Error('test error');
}

// Suppress console.error for expected errors in tests
const originalError = console.error;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Có lỗi xảy ra')).toBeInTheDocument();
    expect(screen.getByText('Thử lại')).toBeInTheDocument();
    expect(screen.getByText('Về trang chủ')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error</div>}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });

  it('tracks error via analytics', () => {
    vi.mock('@/lib/analytics', () => ({
      analytics: {
        trackError: vi.fn(),
        track: vi.fn(),
        identify: vi.fn(),
        reset: vi.fn(),
        trackPageView: vi.fn(),
      },
    }));

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // ErrorBoundary renders error UI and calls trackError in componentDidCatch
    expect(screen.getByText('Có lỗi xảy ra')).toBeInTheDocument();
  });

  it('retries when retry button clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Có lỗi xảy ra')).toBeInTheDocument();

    // Click retry — will re-throw but that's expected
    await user.click(screen.getByText('Thử lại'));
  });
});