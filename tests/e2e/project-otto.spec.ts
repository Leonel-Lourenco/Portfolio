import { test, expect } from '@playwright/test';

test.describe('Otto Project Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects/otto');
  });

  test('page title includes project name', async ({ page }) => {
    await expect(page).toHaveTitle(/Otto.*Leonel Lourenco/);
  });

  test('"Back to Projects" link is present and correct', async ({ page }) => {
    const backLink = page.locator('a[href="/#projects"]');
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Projects');
  });

  test('H1 displays "Otto_2"', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('Otto_2');
  });

  test('description paragraph renders', async ({ page }) => {
    const desc = page.locator('.text-lg.text-muted');
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
    const banner = page.locator('text=Watch Otto transform templates');
    await expect(banner).toBeVisible();
  });

  test('OttoVideo React island mounts', async ({ page }) => {
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

  test.describe('Contact Section (Otto-specific)', () => {
    test('"Get In Touch" heading renders', async ({ page }) => {
      const heading = page.locator('h2:has-text("Get In Touch")');
      await expect(heading).toBeVisible();
    });

    test('Email button has correct href', async ({ page }) => {
      const contactSection = page.locator('.border-t.border-border');
      const emailBtn = contactSection.locator('a[href="mailto:leoneldlourenco@outlook.com"]');
      await expect(emailBtn).toBeVisible();
    });

    test('LinkedIn button has correct href', async ({ page }) => {
      const contactSection = page.locator('.border-t.border-border');
      const linkedinBtn = contactSection.locator('a[href*="linkedin.com"]');
      await expect(linkedinBtn).toBeVisible();
      await expect(linkedinBtn).toHaveAttribute('target', '_blank');
    });

    test('GitHub button has correct href', async ({ page }) => {
      const contactSection = page.locator('.border-t.border-border');
      const githubBtn = contactSection.locator('a[href*="github.com"]');
      await expect(githubBtn).toBeVisible();
      await expect(githubBtn).toHaveAttribute('target', '_blank');
    });
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

    await page.goto('/projects/otto');
    await page.waitForTimeout(3000);

    expect(errors, `Console errors: ${errors.join(', ')}`).toHaveLength(0);
  });
});
