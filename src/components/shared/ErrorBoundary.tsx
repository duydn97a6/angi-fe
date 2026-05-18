'use client';

import { Component, type ReactNode } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    analytics.trackError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/home';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-h2 font-medium text-gray-900">Có lỗi xảy ra</h2>
          <p className="mt-2 text-body text-gray-500">
            Ứng dụng gặp sự cố bất ngờ. Vui lòng thử lại.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="rounded-md border border-gray-300 px-4 py-2 text-body-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Thử lại
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              className="rounded-md bg-coral-400 px-4 py-2 text-body-sm font-medium text-white hover:bg-coral-500"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}