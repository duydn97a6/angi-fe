import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChipSelector } from '../ChipSelector';

const options = [
  { value: 'beef', label: 'Thịt bò' },
  { value: 'seafood', label: 'Hải sản' },
  { value: 'pork', label: 'Thịt heo' },
];

describe('ChipSelector', () => {
  it('renders all options', () => {
    render(<ChipSelector options={options} selected={[]} onChange={() => {}} />);
    expect(screen.getByText('Thịt bò')).toBeInTheDocument();
    expect(screen.getByText('Hải sản')).toBeInTheDocument();
    expect(screen.getByText('Thịt heo')).toBeInTheDocument();
  });

  it('shows checkmark on selected items', () => {
    render(<ChipSelector options={options} selected={['beef']} onChange={() => {}} />);
    expect(screen.getByText(/Thịt bò/)).toHaveTextContent('✓');
  });

  it('toggles selection on click (multi mode)', async () => {
    const handleChange = vi.fn();
    render(<ChipSelector options={options} selected={[]} onChange={handleChange} />);
    await userEvent.click(screen.getByText('Thịt bò'));
    expect(handleChange).toHaveBeenCalledWith(['beef']);
  });

  it('removes selection on click when already selected (multi mode)', async () => {
    const handleChange = vi.fn();
    render(<ChipSelector options={options} selected={['beef']} onChange={handleChange} />);
    await userEvent.click(screen.getByText(/Thịt bò/));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('replaces selection in single mode', async () => {
    const handleChange = vi.fn();
    render(
      <ChipSelector
        options={options}
        selected={['beef']}
        onChange={handleChange}
        multi={false}
      />
    );
    await userEvent.click(screen.getByText('Hải sản'));
    expect(handleChange).toHaveBeenCalledWith(['seafood']);
  });

  it('applies selected styling to selected chips', () => {
    const { container } = render(
      <ChipSelector options={options} selected={['beef']} onChange={() => {}} />
    );
    const selectedChip = screen.getByText(/Thịt bò/).closest('button');
    expect(selectedChip).toHaveClass('border-coral-400');
  });
});