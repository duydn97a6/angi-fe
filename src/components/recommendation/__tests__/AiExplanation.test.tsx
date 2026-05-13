import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AiExplanation } from '../AiExplanation';

describe('AiExplanation', () => {
  it('renders explanation text', () => {
    render(<AiExplanation explanation="Bạn ăn 3 lần, đánh giá rất tích cực" />);
    expect(screen.getByText('Bạn ăn 3 lần, đánh giá rất tích cực')).toBeInTheDocument();
  });

  it('renders lightbulb emoji', () => {
    render(<AiExplanation explanation="Test explanation" />);
    expect(screen.getByText('💡')).toBeInTheDocument();
  });
});