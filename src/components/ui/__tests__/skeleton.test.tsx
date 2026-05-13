import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders with bg-gray-100 class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-48" />);
    expect(container.firstChild).toHaveClass('h-48');
  });
});