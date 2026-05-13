import { describe, it, expect } from 'vitest';
import { isValidToken, normalizeToken } from '../token';

describe('isValidToken', () => {
  it('returns true for valid string', () => {
    expect(isValidToken('abc123')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isValidToken('')).toBe(false);
  });

  it('returns false for whitespace-only string', () => {
    expect(isValidToken('   ')).toBe(false);
  });

  it('returns false for string "undefined"', () => {
    expect(isValidToken('undefined')).toBe(false);
  });

  it('returns false for string "null"', () => {
    expect(isValidToken('null')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidToken(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isValidToken(undefined)).toBe(false);
  });

  it('returns false for number', () => {
    expect(isValidToken(123 as unknown as string)).toBe(false);
  });
});

describe('normalizeToken', () => {
  it('returns the token for valid strings', () => {
    expect(normalizeToken('abc123')).toBe('abc123');
  });

  it('returns null for invalid values', () => {
    expect(normalizeToken(null)).toBeNull();
    expect(normalizeToken(undefined)).toBeNull();
    expect(normalizeToken('')).toBeNull();
    expect(normalizeToken('undefined')).toBeNull();
  });
});