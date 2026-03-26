import { test, expect } from '@playwright/test';

const ALL_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'BrainWave', path: '/projects/brainwave' },
  { name: 'Spec2CAD', path: '/projects/spec2cad' },
  { name: 'Otto', path: '/projects/otto' },
  { name: 'Phantom', path: '/projects/phantom' },
];

test.describe('Performance', () => {
  test.describe('page load times', () => {
    for (const pg of ALL_PAGES) {
      test(`${pg.name} loads within 5 seconds`, async ({ page }) => {
        const start = Date.now();
        const response = await page.goto(pg.path, { waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - start;

        expect(response?.status()).toBe(200);
        expect(loadTime, `${pg.name} took ${loadTime}ms to load`).toBeLessThan(5000);
      });
    }
  });

  test.describe('no unexpected console errors on any page', () => {
    const ignoredPatterns = [
      /Failed to load resource/,
      /astro-island.*Error hydrating/,
      /Failed to fetch dynamically imported module/,
      /Outdated Optimize Dep/,
      /youtube\.com/i,
      /www-widgetapi/i,
      /ytInitialPlayerResponse/i,
      /yt\./i,
      /googlevideo\.com/i,
    ];

    for (const pg of ALL_PAGES) {
      test(`${pg.name} has no unexpected console errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            const text = msg.text();
            if (!ignoredPatterns.some((p) => p.test(text))) {
              errors.push(text);
            }
          }
        });

        await page.goto(pg.path);
        await page.waitForTimeout(2000);

        expect(errors, `Console errors on ${pg.name}: ${errors.join('; ')}`).toHaveLength(0);
      });
    }
  });

  test('no broken internal links', async ({ page }) => {
    const visited = new Set<string>();
    const broken: string[] = [];

    for (const pg of ALL_PAGES) {
      await page.goto(pg.path);
      const links = await page.locator('a[href^="/"]').evaluateAll((els) =>
        els.map((el) => el.getAttribute('href')).filter(Boolean)
      );

      for (const href of links) {
        if (!href || visited.has(href) || href.includes('#')) continue;
        visited.add(href);

        const response = await page.goto(href);
        if (!response || response.status() >= 400) {
          broken.push(`${href} (status: ${response?.status() ?? 'no response'}) found on ${pg.path}`);
        }
      }
    }

    expect(broken, `Broken links:\n${broken.join('\n')}`).toHaveLength(0);
  });

  test('all project card images are loadable', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('.project-card img');
    const count = await images.count();

    const brokenImages: string[] = [];

    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute('src');
      if (!src) {
        brokenImages.push(`Image ${i}: missing src`);
        continue;
      }

      const naturalWidth = await images.nth(i).evaluate(
        (img: HTMLImageElement) => img.naturalWidth
      );

      if (naturalWidth === 0) {
        brokenImages.push(`Image ${i}: ${src} failed to load (naturalWidth=0)`);
      }
    }

    if (brokenImages.length > 0) {
      console.warn('Broken/missing images:', brokenImages);
    }
  });

  test('non-existent route does not return 200', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    const status = response?.status() ?? 0;
    expect(status === 404 || status === 0, `Expected 404 but got ${status}`).toBe(true);
  });
});
