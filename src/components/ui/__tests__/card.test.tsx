import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from '../card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies featured styling', () => {
    const { container } = render(<Card featured>Featured</Card>);
    expect(container.firstChild).toHaveClass('border-2');
    expect(container.firstChild).toHaveClass('border-coral-400');
  });

  it('applies interactive styling', () => {
    const { container } = render(<Card interactive>Clickable</Card>);
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  it('composes CardHeader, CardTitle, CardContent', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});