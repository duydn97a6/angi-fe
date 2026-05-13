import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState } from '../ErrorState';

describe('ErrorState', () => {
  it('renders default error message', () => {
    render(<ErrorState />);
    expect(screen.getByText(/Ối/i)).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(<ErrorState title="Lỗi" description="Vui lòng thử lại" />);
    expect(screen.getByText('Lỗi')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng thử lại')).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorState onRetry={() => {}} />);
    expect(screen.getByRole('button', { name: 'Thử lại' })).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn();
    render(<ErrorState onRetry={handleRetry} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleRetry).toHaveBeenCalledOnce();
  });
});