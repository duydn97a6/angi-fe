import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedbackModal } from '../FeedbackModal';

const mockMeal = {
  id: 'meal-1',
  restaurantName: 'Bún chả Hương Liên',
  dishName: 'Bún chả đặc biệt',
  time: '12:30',
  recommendationId: 'rec-1',
  restaurantId: 'rest-1',
  dishId: 'dish-1',
};

describe('FeedbackModal', () => {
  it('renders modal with restaurant name when open', () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    expect(screen.getByText('Bún chả Hương Liên')).toBeInTheDocument();
  });

  it('renders meal time', () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    expect(screen.getByText(/Ăn lúc 12:30/)).toBeInTheDocument();
  });

  it('renders question text', () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    expect(screen.getByText('Bữa vừa rồi thế nào?')).toBeInTheDocument();
  });

  it('shows regret and tags after emoji selection', async () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    expect(screen.queryByText('Bạn có hối hận không?')).not.toBeInTheDocument();
    await userEvent.click(screen.getByText('Tuyệt!'));
    expect(screen.getByText('Bạn có hối hận không?')).toBeInTheDocument();
    expect(screen.getByText('Lý do (không bắt buộc)')).toBeInTheDocument();
  });

  it('disables submit button before emoji selection', () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    expect(screen.getByRole('button', { name: /Gửi feedback/ })).toBeDisabled();
  });

  it('enables submit after emoji selection', async () => {
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={async () => {}}
      />
    );
    await userEvent.click(screen.getByText('Ổn'));
    expect(screen.getByRole('button', { name: /Gửi feedback/ })).not.toBeDisabled();
  });

  it('calls onSubmit with feedback data', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(
      <FeedbackModal
        meal={mockMeal}
        open={true}
        onClose={() => {}}
        onSubmit={handleSubmit}
      />
    );

    await userEvent.click(screen.getByText('Tuyệt!'));
    await userEvent.click(screen.getByRole('button', { name: /Gửi feedback/ }));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        recommendationId: 'rec-1',
        restaurantId: 'rest-1',
        dishId: 'dish-1',
        emoji: 'happy',
        regretLevel: 'none',
      })
    );
  });
});