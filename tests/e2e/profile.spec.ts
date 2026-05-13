import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/(login|onboarding)/);
  });

  test('profile page loads', async ({ page }) => {
    await page.goto('/profile');
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });
});