import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCard } from '../StatsCard';

describe('StatsCard', () => {
  it('renders label and value', () => {
    render(<StatsCard label="Bữa ăn" value={42} />);
    expect(screen.getByText('Bữa ăn')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders string value', () => {
    render(<StatsCard label="Chi tiêu" value="150.000 ₫" />);
    expect(screen.getByText('150.000 ₫')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<StatsCard label="Test" value={0} className="col-span-2" />);
    expect(container.firstChild).toHaveClass('col-span-2');
  });
});