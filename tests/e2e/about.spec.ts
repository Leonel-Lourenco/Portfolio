import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('H1 "About Me" renders', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('About Me');
  });

  test('bio paragraphs are visible and non-empty', async ({ page }) => {
    const bio = page.locator('.prose p');
    const count = await bio.count();
    expect(count).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < 2; i++) {
      await expect(bio.nth(i)).toBeVisible();
      const text = await bio.nth(i).textContent();
      expect(text!.trim().length).toBeGreaterThan(0);
    }
  });

  test('"What I Do" section has 3 skill cards', async ({ page }) => {
    const skillCards = page.locator('.grid .border.border-border.rounded-lg');
    await expect(skillCards).toHaveCount(3);
  });

  test('skill cards have expected titles', async ({ page }) => {
    const titles = ['Full-Stack Development', 'AI Integration', 'Cloud Infrastructure'];
    for (const title of titles) {
      await expect(page.locator(`h3:has-text("${title}")`)).toBeVisible();
    }
  });

  test('Email button has correct href', async ({ page }) => {
    const emailBtn = page.locator('a[href="mailto:leoneldlourenco@outlook.com"]');
    await expect(emailBtn.first()).toBeVisible();
  });

  test('LinkedIn button has correct href', async ({ page }) => {
    const linkedinBtn = page.locator('a[href="https://www.linkedin.com/in/leonel-lourenco/"]');
    await expect(linkedinBtn).toBeVisible();
  });

  test('"Available for Interviews" badge renders with green dot', async ({ page }) => {
    const badge = page.locator('text=Available for Interviews');
    await expect(badge).toBeVisible();

    const greenDot = page.locator('.bg-green-500.rounded-full.animate-pulse');
    await expect(greenDot).toBeVisible();
  });

  test('mobile: contact buttons stack vertically', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-only test');

    const container = page.locator('.flex.flex-col.sm\\:flex-row.gap-4');
    const direction = await container.evaluate(
      (el) => window.getComputedStyle(el).flexDirection
    );
    expect(direction).toBe('column');
  });

  test('desktop: contact buttons side by side', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Non-mobile test');

    const container = page.locator('.flex.flex-col.sm\\:flex-row.gap-4');
    const direction = await container.evaluate(
      (el) => window.getComputedStyle(el).flexDirection
    );
    expect(direction).toBe('row');
  });

  test('"Back to Home" link is present', async ({ page }) => {
    const backLink = page.locator('section a[href="/"]').filter({ hasText: 'Back to Home' });
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Home');
  });
});
