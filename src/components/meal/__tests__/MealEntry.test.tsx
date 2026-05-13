import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MealEntry } from '../MealEntry';
import type { MealHistoryEntry } from '@/types';

const baseMeal: MealHistoryEntry = {
  id: 'meal-1',
  restaurant: { id: 'r1', name: 'Quán A' },
  mealAt: '2024-01-15T12:30:00Z',
};

describe('MealEntry', () => {
  it('renders restaurant name', () => {
    render(<MealEntry meal={baseMeal} />);
    expect(screen.getByText('Quán A')).toBeInTheDocument();
  });

  it('renders dish name when available', () => {
    const meal: MealHistoryEntry = {
      ...baseMeal,
      dish: { id: 'd1', name: 'Bún chả' },
    };
    render(<MealEntry meal={meal} />);
    expect(screen.getByText('Bún chả')).toBeInTheDocument();
  });

  it('renders price when available', () => {
    const meal: MealHistoryEntry = {
      ...baseMeal,
      pricePaid: 45000,
    };
    render(<MealEntry meal={meal} />);
    expect(screen.getByText(/45.000 ₫/)).toBeInTheDocument();
  });

  it('renders feedback emoji for happy', () => {
    const meal: MealHistoryEntry = {
      ...baseMeal,
      feedback: { emoji: 'happy', regretLevel: 'none', tags: [] },
    };
    render(<MealEntry meal={meal} />);
    expect(screen.getByText('😋')).toBeInTheDocument();
  });

  it('renders feedback tags', () => {
    const meal: MealHistoryEntry = {
      ...baseMeal,
      feedback: { emoji: 'happy', regretLevel: 'none', tags: ['Ngon', 'Rẻ'] },
    };
    render(<MealEntry meal={meal} />);
    expect(screen.getByText('Ngon')).toBeInTheDocument();
    expect(screen.getByText('Rẻ')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<MealEntry meal={baseMeal} onClick={handleClick} />);
    await userEvent.click(screen.getByText('Quán A'));
    expect(handleClick).toHaveBeenCalledWith(baseMeal);
  });
});