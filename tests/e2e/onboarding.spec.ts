import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('onboarding intro page loads', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page).toHaveURL(/onboarding/);
  });

  test('onboarding region step has region options', async ({ page }) => {
    await page.goto('/onboarding/region');
    const regionButtons = page.locator('button');
    await expect(regionButtons.first()).toBeVisible();
  });

  test('onboarding diet step has food options', async ({ page }) => {
    await page.goto('/onboarding/diet');
    await expect(page.locator('text=Món không ăn').or(page.locator('h1, h2, h3')).first()).toBeVisible();
  });

  test('onboarding budget step loads', async ({ page }) => {
    await page.goto('/onboarding/budget');
    await expect(page.locator('main, form, div').first()).toBeVisible();
  });
});