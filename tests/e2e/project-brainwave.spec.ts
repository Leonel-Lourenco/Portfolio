import { test, expect } from '@playwright/test';

test.describe('BrainWave Project Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects/brainwave');
  });

  test('page title includes project name', async ({ page }) => {
    await expect(page).toHaveTitle(/BrainWave.*Leonel Lourenco/);
  });

  test('"Back to Projects" link is present and correct', async ({ page }) => {
    const backLink = page.locator('section a[href="/#projects"]');
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Projects');
  });

  test('H1 displays "BrainWave"', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('BrainWave');
  });

  test('description paragraph renders', async ({ page }) => {
    const desc = page.locator('h1 + p, .text-lg.text-muted');
    await expect(desc.first()).toBeVisible();
    const text = await desc.first().textContent();
    expect(text!.trim().length).toBeGreaterThan(0);
  });

  test('technology badge tags render', async ({ page }) => {
    const badges = page.locator('.badge');
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('video demo container renders', async ({ page }) => {
    const demoContainer = page.locator('.border.border-border.rounded-lg.overflow-hidden');
    await expect(demoContainer.first()).toBeVisible();
  });

  test('video demo info banner has correct text', async ({ page }) => {
    const banner = page.locator('text=Watch BrainWave in action');
    await expect(banner).toBeVisible();
  });

  test('BrainwaveVideo React island mounts', async ({ page }) => {
    const demoContainer = page.locator('.border.border-border.rounded-lg.overflow-hidden.bg-secondary');
    await expect(demoContainer).toBeVisible();

    const box = await demoContainer.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.height).toBeGreaterThan(50);
  });

  test('"About This Project" section renders', async ({ page }) => {
    const heading = page.locator('h2:has-text("About This Project")');
    await expect(heading).toBeVisible();
  });

  test('key features list renders correct count', async ({ page }) => {
    const features = page.locator('ul.space-y-2 li');
    await expect(features).toHaveCount(5);
  });

  test('technology stack pills render', async ({ page }) => {
    const pills = page.locator('.flex.flex-wrap.gap-2 .bg-border\\/50');
    const count = await pills.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('no unexpected console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    const ignoredPatterns = [
      /Failed to load resource/,
      /astro-island.*Error hydrating/,
      /Failed to fetch dynamically imported module/,
      /Outdated Optimize Dep/,
    ];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!ignoredPatterns.some((p) => p.test(text))) {
          errors.push(text);
        }
      }
    });

    await page.goto('/projects/brainwave');
    await page.waitForTimeout(3000);

    expect(errors, `Console errors: ${errors.join(', ')}`).toHaveLength(0);
  });
});
