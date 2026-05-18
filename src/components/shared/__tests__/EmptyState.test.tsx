import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="Không có dữ liệu" />);
    expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState title="Trống" description="Thử tìm kiếm khác" />);
    expect(screen.getByText('Thử tìm kiếm khác')).toBeInTheDocument();
  });

  it('renders default mascot icon', () => {
    render(<EmptyState title="Trống" />);
    expect(screen.getByText('🤔')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<EmptyState title="Trống" icon={<span>📍</span>} />);
    expect(screen.getByText('📍')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    render(
      <EmptyState
        title="Trống"
        action={{ label: 'Thử lại', onClick: () => {} }}
      />
    );
    expect(screen.getByRole('button', { name: 'Thử lại' })).toBeInTheDocument();
  });

  it('calls action onClick', async () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="Trống"
        action={{ label: 'Thử lại', onClick: handleClick }}
      />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});