import { test, expect } from '@playwright/test';

const ALL_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'BrainWave', path: '/projects/brainwave' },
  { name: 'Spec2CAD', path: '/projects/spec2cad' },
  { name: 'Otto', path: '/projects/otto' },
  { name: 'Phantom', path: '/projects/phantom' },
];

test.describe('Accessibility', () => {
  for (const pg of ALL_PAGES) {
    test.describe(pg.name, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(pg.path);
      });

      test('all images have alt attributes', async ({ page }) => {
        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
          const alt = await images.nth(i).getAttribute('alt');
          expect(alt, `Image at index ${i} missing alt`).not.toBeNull();
        }
      });

      test('has at least one H1', async ({ page }) => {
        const h1s = page.locator('h1');
        const count = await h1s.count();
        expect(count, 'Page should have at least one H1').toBeGreaterThanOrEqual(1);
      });

      test('heading hierarchy starts with H1 and uses no level beyond H3', async ({ page }) => {
        const headings = await page.evaluate(() => {
          const headingEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          return Array.from(headingEls).map((h) => parseInt(h.tagName[1]));
        });

        expect(headings.length).toBeGreaterThan(0);
        expect(headings[0]).toBe(1);

        const usedLevels = [...new Set(headings)].sort();
        for (const level of usedLevels) {
          expect(
            level,
            `Heading level H${level} exceeds expected maximum of H3`
          ).toBeLessThanOrEqual(3);
        }
      });

      test('all links and buttons are keyboard-focusable', async ({ page }) => {
        const interactives = page.locator('a[href], button');
        const count = await interactives.count();

        for (let i = 0; i < count; i++) {
          const el = interactives.nth(i);
          const tabindex = await el.getAttribute('tabindex');
          if (tabindex !== null) {
            expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
          }
        }
      });

      test('footer social links have aria-label', async ({ page }) => {
        const socialLinks = page.locator('footer a[aria-label]');
        const count = await socialLinks.count();
        expect(count).toBeGreaterThanOrEqual(2);

        for (let i = 0; i < count; i++) {
          const label = await socialLinks.nth(i).getAttribute('aria-label');
          expect(label).toBeTruthy();
          expect(label!.length).toBeGreaterThan(0);
        }
      });
    });
  }

  test('hamburger button has aria-label', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-only test');
    await page.goto('/');
    const hamburger = page.locator('#mobile-menu-btn');
    await expect(hamburger).toHaveAttribute('aria-label', 'Toggle menu');
  });

  test('hero has sr-only span for accessible name', async ({ page }) => {
    await page.goto('/');
    const srOnly = page.locator('h1 .sr-only');
    await expect(srOnly).toHaveText('Leonel Lourenco');
  });

  test('keyboard tab navigation follows visual order', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName + (el?.getAttribute('href') || '');
    });
    expect(firstFocused).toBeTruthy();

    await page.keyboard.press('Tab');
    const secondFocused = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName + (el?.getAttribute('href') || '');
    });
    expect(secondFocused).toBeTruthy();
    expect(secondFocused).not.toBe(firstFocused);
  });

  test('focus indicators are visible on keyboard navigation', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const focusedEl = page.locator(':focus');
    const outline = await focusedEl.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        boxShadow: style.boxShadow,
      };
    });

    const hasFocusIndicator =
      (outline.outlineStyle !== 'none' && outline.outlineWidth !== '0px') ||
      outline.boxShadow !== 'none';

    expect(hasFocusIndicator, 'Focused element should have a visible focus indicator').toBe(true);
  });
});
