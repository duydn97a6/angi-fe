import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders correct number of segments', () => {
    const { container } = render(<ProgressBar current={2} total={5} />);
    const segments = container.querySelectorAll('.h-1');
    expect(segments).toHaveLength(5);
  });

  it('fills segments up to current step', () => {
    const { container } = render(<ProgressBar current={3} total={5} />);
    const segments = container.querySelectorAll('.h-1');
    const filled = Array.from(segments).filter((s) =>
      s.classList.contains('bg-coral-400')
    );
    const unfilled = Array.from(segments).filter((s) =>
      s.classList.contains('bg-gray-200')
    );
    expect(filled).toHaveLength(3);
    expect(unfilled).toHaveLength(2);
  });

  it('has accessible label', () => {
    render(<ProgressBar current={2} total={5} />);
    expect(screen.getByLabelText('Bước 2 trên 5')).toBeInTheDocument();
  });

  it('handles zero current step', () => {
    const { container } = render(<ProgressBar current={0} total={4} />);
    const filled = container.querySelectorAll('.bg-coral-400');
    expect(filled).toHaveLength(0);
  });
});