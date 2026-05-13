import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';

function createMatchMedia(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(false);
  });

  it('returns false when media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('returns true when media query matches', () => {
    window.matchMedia = createMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });
});