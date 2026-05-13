import { test, expect } from '@playwright/test';

test.describe('History Page', () => {
  test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/history');
    await expect(page).toHaveURL(/\/(login|onboarding)/);
  });

  test('history page loads', async ({ page }) => {
    await page.goto('/history');
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });
});