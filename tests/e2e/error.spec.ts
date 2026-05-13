import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('404 page shows not found', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    expect(response?.status()).toBe(404);
  });

  test('offline page loads correctly', async ({ page }) => {
    await page.goto('/offline');
    await expect(page.getByText('Mất kết nối')).toBeVisible();
  });
});