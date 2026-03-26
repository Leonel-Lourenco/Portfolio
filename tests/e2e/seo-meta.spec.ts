import { test, expect } from '@playwright/test';

const ALL_PAGES = [
  { name: 'Homepage', path: '/', expectedTitle: 'Leonel Lourenco | Full-Stack Engineer' },
  { name: 'About', path: '/about', expectedTitle: 'About | Leonel Lourenco' },
  { name: 'BrainWave', path: '/projects/brainwave', expectedTitle: /BrainWave/ },
  { name: 'Spec2CAD', path: '/projects/spec2cad', expectedTitle: /Spec2CAD/ },
  { name: 'Otto', path: '/projects/otto', expectedTitle: /Otto/ },
  { name: 'Phantom', path: '/projects/phantom', expectedTitle: /Phantom/ },
];

test.describe('SEO & Meta Tags', () => {
  for (const pg of ALL_PAGES) {
    test.describe(pg.name, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(pg.path);
      });

      test('has a meaningful <title>', async ({ page }) => {
        const title = await page.title();
        expect(title.length).toBeGreaterThan(5);
        if (typeof pg.expectedTitle === 'string') {
          expect(title).toBe(pg.expectedTitle);
        } else {
          expect(title).toMatch(pg.expectedTitle);
        }
      });

      test('has <meta name="description"> that is non-empty', async ({ page }) => {
        const desc = await page.locator('meta[name="description"]').getAttribute('content');
        expect(desc).toBeTruthy();
        expect(desc!.length).toBeGreaterThan(20);
      });

      test('has Open Graph tags', async ({ page }) => {
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
        const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
        const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
        const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');

        expect(ogTitle).toBeTruthy();
        expect(ogDesc).toBeTruthy();
        expect(ogImage).toBeTruthy();
        expect(ogUrl).toBeTruthy();
        expect(ogType).toBe('website');
      });

      test('has Twitter Card tags', async ({ page }) => {
        const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
        const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
        const twitterDesc = await page.locator('meta[name="twitter:description"]').getAttribute('content');

        expect(twitterCard).toBe('summary_large_image');
        expect(twitterTitle).toBeTruthy();
        expect(twitterDesc).toBeTruthy();
      });

      test('has <link rel="canonical">', async ({ page }) => {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
      });

      test('html lang is set to "en"', async ({ page }) => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBe('en');
      });

      test('viewport meta tag is present', async ({ page }) => {
        const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
        expect(viewport).toContain('width=device-width');
      });

      test('favicon link is present', async ({ page }) => {
        const favicon = page.locator('link[rel="icon"]');
        await expect(favicon).toHaveCount(1);
        const href = await favicon.getAttribute('href');
        expect(href).toContain('favicon');
      });
    });
  }
});
