import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingState } from '../LoadingState';
import { Skeleton } from '@/components/ui/skeleton';

describe('LoadingState', () => {
  it('renders 3 skeletons by default', () => {
    const { container } = render(<LoadingState />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
  });

  it('renders custom count of skeletons', () => {
    const { container } = render(<LoadingState count={5} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(5);
  });
});