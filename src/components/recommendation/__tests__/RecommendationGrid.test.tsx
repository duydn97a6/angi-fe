import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecommendationGrid } from '../RecommendationGrid';
import type { RecommendationItem } from '@/types';

const mockRecommendation: RecommendationItem = {
  category: 'safe',
  restaurant: {
    id: 'r1',
    name: 'Quán Test',
    cuisine: 'Bún chả',
    avgPrice: 45000,
    distance: 350,
    rating: 4.6,
  },
  dish: { id: 'd1', name: 'Bún chả', price: 45000 },
  explanation: 'Bạn ăn 3 lần',
  estimatedDeliveryMinutes: 15,
};

describe('RecommendationGrid', () => {
  it('shows loading state with skeletons', () => {
    const { container } = render(<RecommendationGrid recommendations={[]} isLoading onCardClick={() => {}} />);
    const skeletons = container.querySelectorAll('.skeleton-shimmer');
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it('shows error state', () => {
    render(
      <RecommendationGrid
        recommendations={[]}
        error={new Error('Network error')}
        onCardClick={() => {}}
        onRetry={() => {}}
      />
    );
    expect(screen.getByText(/Ối/i)).toBeInTheDocument();
  });

  it('shows empty state when no recommendations', () => {
    render(<RecommendationGrid recommendations={[]} onCardClick={() => {}} />);
    expect(screen.getByText('Chưa có quán nào gần đây')).toBeInTheDocument();
  });

  it('renders recommendation cards', () => {
    render(
      <RecommendationGrid
        recommendations={[mockRecommendation]}
        onCardClick={() => {}}
      />
    );
    expect(screen.getByText('Quán Test')).toBeInTheDocument();
  });

  it('renders multiple recommendations', () => {
    const rec2 = { ...mockRecommendation, restaurant: { ...mockRecommendation.restaurant, id: 'r2', name: 'Quán B' } };
    render(
      <RecommendationGrid
        recommendations={[mockRecommendation, rec2]}
        onCardClick={() => {}}
      />
    );
    expect(screen.getByText('Quán Test')).toBeInTheDocument();
    expect(screen.getByText('Quán B')).toBeInTheDocument();
  });
});