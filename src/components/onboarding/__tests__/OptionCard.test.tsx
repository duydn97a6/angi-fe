import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptionCard } from '../OptionCard';

describe('OptionCard', () => {
  it('renders title', () => {
    render(<OptionCard title="Miền Bắc" selected={false} onClick={() => {}} />);
    expect(screen.getByText('Miền Bắc')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <OptionCard
        title="Miền Bắc"
        description="Hà Nội, Hải Phòng..."
        selected={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('Hà Nội, Hải Phòng...')).toBeInTheDocument();
  });

  it('shows check icon when selected', () => {
    const { container } = render(<OptionCard title="Option" selected onClick={() => {}} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('does not show check icon when not selected', () => {
    const { container } = render(<OptionCard title="Option" selected={false} onClick={() => {}} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('applies selected styling', () => {
    const { container } = render(<OptionCard title="Option" selected onClick={() => {}} />);
    expect(container.firstChild).toHaveClass('border-coral-400');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<OptionCard title="Option" selected={false} onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});