import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedBadge } from '../FeaturedBadge';

describe('FeaturedBadge', () => {
  it('renders AI recommendation text', () => {
    render(<FeaturedBadge />);
    expect(screen.getByText('AI đề xuất #1')).toBeInTheDocument();
  });

  it('renders sparkle icon', () => {
    const { container } = render(<FeaturedBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});