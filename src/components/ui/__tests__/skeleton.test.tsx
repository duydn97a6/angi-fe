import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with skeleton-shimmer class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('skeleton-shimmer');
  });

  it('renders with rounded-md class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-48" />);
    expect(container.firstChild).toHaveClass('h-48');
  });
});