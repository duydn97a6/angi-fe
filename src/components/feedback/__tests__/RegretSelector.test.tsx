import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegretSelector } from '../RegretSelector';

describe('RegretSelector', () => {
  it('renders all three regret options', () => {
    render(<RegretSelector value={null} onChange={() => {}} />);
    expect(screen.getByText('Không hề')).toBeInTheDocument();
    expect(screen.getByText('Hơi chút')).toBeInTheDocument();
    expect(screen.getByText('Có')).toBeInTheDocument();
  });

  it('calls onChange when an option is clicked', async () => {
    const handleChange = vi.fn();
    render(<RegretSelector value={null} onChange={handleChange} />);
    await userEvent.click(screen.getByText('Có'));
    expect(handleChange).toHaveBeenCalledWith('high');
  });

  it('applies selected styling to chosen option', () => {
    render(<RegretSelector value="slight" onChange={() => {}} />);
    const selectedButton = screen.getByText('Hơi chút').closest('button');
    expect(selectedButton).toHaveClass('border-coral-400');
  });

  it('applies default styling to unselected options', () => {
    render(<RegretSelector value="none" onChange={() => {}} />);
    const unselectedButton = screen.getByText('Có').closest('button');
    expect(unselectedButton).toHaveClass('border-gray-200');
  });
});