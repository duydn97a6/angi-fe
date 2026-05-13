import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies safe variant styling', () => {
    render(<Badge variant="safe">An toàn</Badge>);
    const badge = screen.getByText('An toàn');
    expect(badge).toHaveClass('bg-greenie-50');
    expect(badge).toHaveClass('text-greenie-800');
  });

  it('applies familiar variant styling', () => {
    render(<Badge variant="familiar">Quen thuộc</Badge>);
    const badge = screen.getByText('Quen thuộc');
    expect(badge).toHaveClass('bg-purple-50');
  });

  it('applies discovery variant styling', () => {
    render(<Badge variant="discovery">Khám phá</Badge>);
    const badge = screen.getByText('Khám phá');
    expect(badge).toHaveClass('bg-amber-50');
  });

  it('applies default variant when none specified', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-gray-100');
  });
});