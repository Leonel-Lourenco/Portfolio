import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('displays the name "Leonel Lourenco"', async ({ page }) => {
      const srOnly = page.locator('.sr-only');
      await expect(srOnly).toContainText('Leonel Lourenco');
    });

    test('displays the tagline', async ({ page }) => {
      const tagline = page.locator('.hero-tagline');
      await expect(tagline).toBeVisible();
      await expect(tagline).toContainText('Full-Stack Engineer');
    });

    test('hero letters animate to visible', async ({ page }) => {
      await page.waitForTimeout(2000);
      const letters = page.locator('.hero-letter');
      const count = await letters.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < Math.min(count, 5); i++) {
        const opacity = await letters.nth(i).evaluate(
          (el) => window.getComputedStyle(el).opacity
        );
        expect(Number(opacity)).toBeGreaterThan(0);
      }
    });

    test('"View Projects" button links to #projects', async ({ page }) => {
      const viewBtn = page.locator('.hero-cta a[href="/#projects"]');
      await expect(viewBtn).toBeVisible();
      await expect(viewBtn).toContainText('View Projects');
    });

    test('"About Me" button links to /about', async ({ page }) => {
      const aboutBtn = page.locator('.hero-cta a[href="/about"]');
      await expect(aboutBtn).toBeVisible();
      await expect(aboutBtn).toContainText('About Me');
    });

    test('scroll indicator is visible', async ({ page }) => {
      const scrollIndicator = page.locator('.animate-bounce');
      await expect(scrollIndicator).toBeVisible();
    });
  });

  test.describe('Project Cards Section', () => {
    test('renders exactly 4 project cards', async ({ page }) => {
      const cards = page.locator('.project-card');
      await expect(cards).toHaveCount(4);
    });

    test('each card has title, description, tags, and Explore link', async ({ page }) => {
      const cards = page.locator('.project-card');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        await expect(card.locator('h3')).toBeVisible();
        await expect(card.locator('p')).toBeVisible();
        await expect(card.locator('span:has-text("Explore")')).toBeVisible();
      }
    });

    test('cards link to correct project URLs', async ({ page }) => {
      const expectedSlugs = ['brainwave', 'spec2cad', 'otto', 'phantom'];
      const cards = page.locator('.project-card');

      for (let i = 0; i < expectedSlugs.length; i++) {
        const href = await cards.nth(i).getAttribute('href');
        expect(href).toBe(`/projects/${expectedSlugs[i]}`);
      }
    });

    test('card images have lazy loading', async ({ page }) => {
      const images = page.locator('.project-card img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        await expect(images.nth(i)).toHaveAttribute('loading', 'lazy');
      }
    });

    test('card images have alt text', async ({ page }) => {
      const images = page.locator('.project-card img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(0);
      }
    });

    test('mobile: cards in single column', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'mobile', 'Mobile-only test');
      const grid = page.locator('#projects .grid');
      const style = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
      const columns = style.split(' ').length;
      expect(columns).toBe(1);
    });

    test('desktop: cards in 2-column grid', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name === 'mobile', 'Desktop/tablet test');
      const grid = page.locator('#projects .grid');
      const style = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
      const columns = style.split(' ').filter((s) => s.trim()).length;
      expect(columns).toBe(2);
    });
  });

  test.describe('CTA Section', () => {
    test('"Available for Opportunities" section renders', async ({ page }) => {
      const cta = page.locator('text=Available for Opportunities');
      await expect(cta).toBeVisible();
    });

    test('"Get in Touch" mailto link is correct', async ({ page }) => {
      const ctaSection = page.locator('.bg-primary');
      const emailLink = ctaSection.locator('a[href^="mailto:"]');
      await expect(emailLink).toHaveAttribute('href', 'mailto:leoneldlourenco@outlook.com');
    });

    test('"Learn More" links to /about', async ({ page }) => {
      const ctaSection = page.locator('.bg-primary');
      const learnMore = ctaSection.locator('a[href="/about"]');
      await expect(learnMore).toBeVisible();
    });
  });
});
