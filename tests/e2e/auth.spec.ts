import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page loads and shows form', async ({ page }) => {
    await page.goto('/login');
    const heading = page.getByRole('heading', { name: /đăng nhập/i });
    const text = page.locator('text=Đăng nhập');
    await expect(heading.or(text).first()).toBeVisible();
  });

  test('login page has email and password fields', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('register page loads', async ({ page }) => {
    await page.goto('/register');
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
  });
});