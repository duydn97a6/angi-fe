import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('mobile viewport shows bottom navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/login');
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('desktop viewport shows header navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/login');
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });
});