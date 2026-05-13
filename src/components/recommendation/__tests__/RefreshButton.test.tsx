import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefreshButton } from '../RefreshButton';

describe('RefreshButton', () => {
  it('renders button with text', () => {
    render(<RefreshButton onClick={() => {}} />);
    expect(screen.getByText('Gợi ý khác')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<RefreshButton onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows loading state', () => {
    render(<RefreshButton onClick={() => {}} loading />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Đang xử lý...');
  });
});