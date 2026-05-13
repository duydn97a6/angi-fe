import { describe, it, expect } from 'vitest';
import { formatPrice, formatDistance, formatDate, formatTime } from '../format';

describe('formatPrice', () => {
  it('formats VND currency with no decimals', () => {
    expect(formatPrice(45000)).toBe('45.000 ₫');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0 ₫');
  });

  it('formats large numbers', () => {
    expect(formatPrice(150000)).toBe('150.000 ₫');
  });
});

describe('formatDistance', () => {
  it('formats meters when under 1000', () => {
    expect(formatDistance(350)).toBe('350m');
    expect(formatDistance(999)).toBe('999m');
  });

  it('formats kilometers when 1000 or more', () => {
    expect(formatDistance(1500)).toBe('1.5km');
    expect(formatDistance(1000)).toBe('1.0km');
  });

  it('rounds meters to nearest integer', () => {
    expect(formatDistance(350.7)).toBe('351m');
  });
});

describe('formatDate', () => {
  it('formats a Date object', () => {
    const date = new Date(2024, 0, 15);
    const result = formatDate(date);
    expect(result).toContain('2024');
  });

  it('formats an ISO string', () => {
    const result = formatDate('2024-01-15T00:00:00Z');
    expect(result).toContain('2024');
  });
});

describe('formatTime', () => {
  it('formats time from a Date object', () => {
    const date = new Date(2024, 0, 15, 14, 30);
    const result = formatTime(date);
    expect(result).toMatch(/14/);
    expect(result).toMatch(/30/);
  });

  it('formats time from an ISO string', () => {
    const result = formatTime('2024-01-15T14:30:00Z');
    expect(result).toBeTruthy();
  });
});