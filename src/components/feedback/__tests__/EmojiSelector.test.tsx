import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmojiSelector } from '../EmojiSelector';

describe('EmojiSelector', () => {
  it('renders all three emoji options', () => {
    render(<EmojiSelector value={null} onChange={() => {}} />);
    expect(screen.getByText('Tệ')).toBeInTheDocument();
    expect(screen.getByText('Ổn')).toBeInTheDocument();
    expect(screen.getByText('Tuyệt!')).toBeInTheDocument();
  });

  it('renders emoji characters', () => {
    render(<EmojiSelector value={null} onChange={() => {}} />);
    expect(screen.getByText('😕')).toBeInTheDocument();
    expect(screen.getByText('😐')).toBeInTheDocument();
    expect(screen.getByText('😋')).toBeInTheDocument();
  });

  it('calls onChange when an emoji is clicked', async () => {
    const handleChange = vi.fn();
    render(<EmojiSelector value={null} onChange={handleChange} />);
    await userEvent.click(screen.getByText('Tuyệt!'));
    expect(handleChange).toHaveBeenCalledWith('happy');
  });

  it('applies selected styling to chosen emoji', () => {
    render(<EmojiSelector value="sad" onChange={() => {}} />);
    const sadButton = screen.getByText('Tệ').closest('button');
    expect(sadButton).toHaveClass('border-red-500');
  });

  it('highlights happy emoji with green when selected', () => {
    render(<EmojiSelector value="happy" onChange={() => {}} />);
    const happyButton = screen.getByText('Tuyệt!').closest('button');
    expect(happyButton).toHaveClass('border-green-500');
  });

  it('highlights neutral emoji with gray when selected', () => {
    render(<EmojiSelector value="neutral" onChange={() => {}} />);
    const neutralButton = screen.getByText('Ổn').closest('button');
    expect(neutralButton).toHaveClass('border-gray-400');
  });
});