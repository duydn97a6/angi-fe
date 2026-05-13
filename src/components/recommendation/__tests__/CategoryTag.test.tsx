import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryTag } from '../CategoryTag';

describe('CategoryTag', () => {
  it('renders safe category with Vietnamese label', () => {
    render(<CategoryTag category="safe" />);
    expect(screen.getByText('An toàn')).toBeInTheDocument();
  });

  it('renders familiar category with Vietnamese label', () => {
    render(<CategoryTag category="familiar" />);
    expect(screen.getByText('Quen thuộc')).toBeInTheDocument();
  });

  it('renders discovery category with Vietnamese label', () => {
    render(<CategoryTag category="discovery" />);
    expect(screen.getByText('Khám phá')).toBeInTheDocument();
  });

  it('applies correct badge variant for each category', () => {
    const { rerender } = render(<CategoryTag category="safe" />);
    expect(screen.getByText('An toàn')).toHaveClass('bg-greenie-50');

    rerender(<CategoryTag category="familiar" />);
    expect(screen.getByText('Quen thuộc')).toHaveClass('bg-purple-50');

    rerender(<CategoryTag category="discovery" />);
    expect(screen.getByText('Khám phá')).toHaveClass('bg-amber-50');
  });
});