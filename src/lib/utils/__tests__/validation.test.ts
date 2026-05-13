import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema, forgotPasswordSchema } from '../validation';

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'password123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Vui lòng nhập email');
    }
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email không hợp lệ');
    }
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: '' });
    expect(result.success).toBe(false);
  });
});

describe('registerSchema', () => {
  it('validates correct register data', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects short name', () => {
    const result = registerSchema.safeParse({
      name: 'T',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Tên phải có ít nhất 2 ký tự');
    }
  });

  it('rejects short password', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: 'short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Mật khẩu phải có ít nhất 8 ký tự');
    }
  });
});

describe('forgotPasswordSchema', () => {
  it('validates correct email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'invalid' });
    expect(result.success).toBe(false);
  });
});