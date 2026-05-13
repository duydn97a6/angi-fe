import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/\/login/);
  });

  test('offline page loads', async ({ page }) => {
    await page.goto('/offline');
    await expect(page.getByText('Mất kết nối')).toBeVisible();
  });
});