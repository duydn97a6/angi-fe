import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../avatar';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Nguyen Van" />);
    expect(screen.getByText('NV')).toBeInTheDocument();
  });

  it('renders initials from single name', () => {
    render(<Avatar name="Duy" />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('renders initials limited to 2 characters', () => {
    render(<Avatar name="Nguyen Van Duc Anh" />);
    expect(screen.getByText('NV')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar name="Test" src="/avatar.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Test');
  });

  it('applies size classes', () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass('h-11');
  });

  it('applies default md size', () => {
    const { container } = render(<Avatar name="Test" />);
    expect(container.firstChild).toHaveClass('h-9');
  });

  it('applies consistent color based on name', () => {
    const { container: c1 } = render(<Avatar name="Alice" />);
    const { container: c2 } = render(<Avatar name="Alice" />);
    const el1 = c1.firstChild as HTMLElement;
    const el2 = c2.firstChild as HTMLElement;
    expect(el1?.className).toBe(el2?.className);
  });
});