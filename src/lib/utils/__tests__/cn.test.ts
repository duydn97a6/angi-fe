import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('merges arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });
});