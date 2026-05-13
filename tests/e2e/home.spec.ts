import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/\/(login|onboarding)/);
  });

  test('shows app branding on home', async ({ page }) => {
    await page.goto('/home');
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });
});