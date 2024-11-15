import { expect, test } from '@playwright/test';

test('home page expects div', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('div').first()).toBeVisible();
});
