import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HealthWarning } from '../HealthWarning';

describe('HealthWarning', () => {
  it('renders warning text', () => {
    render(<HealthWarning warning="Bạn đang ăn quá nhiều đồ dầu mỡ" />);
    expect(screen.getByText('Bạn đang ăn quá nhiều đồ dầu mỡ')).toBeInTheDocument();
  });

  it('renders percentage when provided', () => {
    render(<HealthWarning warning="Cảnh báo" percentage={75} />);
    expect(screen.getByText('Tỷ lệ đồ dầu mỡ: 75%')).toBeInTheDocument();
  });

  it('does not render percentage when not provided', () => {
    render(<HealthWarning warning="Cảnh báo" />);
    expect(screen.queryByText(/Tỷ lệ/)).not.toBeInTheDocument();
  });

  it('renders warning icon', () => {
    const { container } = render(<HealthWarning warning="Test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});