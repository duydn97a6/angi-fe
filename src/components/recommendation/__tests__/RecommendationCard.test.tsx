import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecommendationCard } from '../RecommendationCard';
import type { RecommendationItem } from '@/types';

const mockRecommendation: RecommendationItem = {
  category: 'safe',
  restaurant: {
    id: 'r1',
    name: 'Bún chả Hương Liên',
    cuisine: 'Bún chả',
    avgPrice: 45000,
    distance: 350,
    rating: 4.6,
  },
  dish: {
    id: 'd1',
    name: 'Bún chả đặc biệt',
    price: 45000,
  },
  explanation: 'Bạn ăn 3 lần, đánh giá rất tích cực',
  estimatedDeliveryMinutes: 15,
  isTopPick: false,
};

describe('RecommendationCard', () => {
  it('renders restaurant name', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('Bún chả Hương Liên')).toBeInTheDocument();
  });

  it('renders category tag', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('An toàn')).toBeInTheDocument();
  });

  it('renders dish name and price', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText(/Bún chả đặc biệt/)).toBeInTheDocument();
  });

  it('renders distance and rating', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('350m')).toBeInTheDocument();
    expect(screen.getByText('4.6')).toBeInTheDocument();
  });

  it('renders AI explanation', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText(/Bạn ăn 3 lần/)).toBeInTheDocument();
  });

  it('renders as featured when isFeatured is true', () => {
    const { container } = render(
      <RecommendationCard recommendation={mockRecommendation} isFeatured />
    );
    expect(container.querySelector('.border-coral-400')).toBeTruthy();
  });

  it('shows featured badge when isFeatured', () => {
    render(<RecommendationCard recommendation={mockRecommendation} isFeatured />);
    expect(screen.getByText('AI đề xuất #1')).toBeInTheDocument();
  });
});