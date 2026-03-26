import { test, expect } from '@playwright/test';

const ROUTES = [
  { name: 'homepage', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'project-brainwave', path: '/projects/brainwave' },
  { name: 'project-spec2cad', path: '/projects/spec2cad' },
  { name: 'project-otto', path: '/projects/otto' },
  { name: 'project-phantom', path: '/projects/phantom' },
];

test.describe('Visual Regression', () => {
  // Skip in CI: baselines are OS-specific (win32) and CI runs Ubuntu
  test.skip(!!process.env.CI, 'Visual regression skipped in CI — baselines are Windows-only');

  for (const route of ROUTES) {
    test(`${route.name} matches baseline screenshot`, async ({ page }, testInfo) => {
      await page.goto(route.path);
      // Wait for animations to settle
      await page.waitForTimeout(2000);

      await expect(page).toHaveScreenshot(`${route.name}-${testInfo.project.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
        animations: 'disabled',
      });
    });
  }
});
