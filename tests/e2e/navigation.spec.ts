import { test, expect } from '@playwright/test';

const ALL_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'BrainWave', path: '/projects/brainwave' },
  { name: 'Spec2CAD', path: '/projects/spec2cad' },
  { name: 'Otto', path: '/projects/otto' },
  { name: 'Phantom', path: '/projects/phantom' },
];

test.describe('Navigation & Routing', () => {
  test.describe('Header presence on all pages', () => {
    for (const page of ALL_PAGES) {
      test(`header renders on ${page.name}`, async ({ page: p }) => {
        await p.goto(page.path);
        const header = p.locator('header');
        await expect(header).toBeVisible();
        await expect(p.locator('header a[href="/"]')).toBeVisible();
      });
    }
  });

  test.describe('Footer presence on all pages', () => {
    for (const page of ALL_PAGES) {
      test(`footer renders on ${page.name}`, async ({ page: p }) => {
        await p.goto(page.path);
        const footer = p.locator('footer');
        await expect(footer).toBeVisible();
      });
    }
  });

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about');
    const logo = page.locator('header a[href="/"]');
    await expect(logo).toHaveText('LL');
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('desktop nav shows Projects and About links', async ({ page, browserName }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Desktop-only test');
    await page.goto('/');
    const projectsLink = page.locator('header ul a[href="/#projects"]');
    const aboutLink = page.locator('header ul a[href="/about"]');
    await expect(projectsLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  });

  test('mobile hamburger menu toggles nav links', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-only test');
    await page.goto('/');

    const hamburger = page.locator('#mobile-menu-btn');
    await expect(hamburger).toBeVisible();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeHidden();

    await hamburger.click();
    await expect(mobileMenu).toBeVisible();

    const menuLinks = mobileMenu.locator('a');
    await expect(menuLinks).toHaveCount(2);
  });

  test('contact button has correct mailto href', async ({ page }) => {
    await page.goto('/');
    const contactBtn = page.locator('header a[href^="mailto:"]');
    await expect(contactBtn).toHaveAttribute('href', 'mailto:leoneldlourenco@outlook.com');
  });

  test('About link navigates to about page', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a[href="/about"]').first().click();
    await expect(page).toHaveURL('/about');
  });

  test.describe('Back links on project pages', () => {
    const projectPages = ALL_PAGES.filter((p) => p.path.startsWith('/projects/'));
    for (const proj of projectPages) {
      test(`${proj.name} has "Back to Projects" link`, async ({ page }) => {
        await page.goto(proj.path);
        const backLink = page.locator('section a[href="/#projects"]');
        await expect(backLink).toBeVisible();
        await expect(backLink).toContainText('Back to Projects');
      });
    }
  });

  test('About page has "Back to Home" link', async ({ page }) => {
    await page.goto('/about');
    const backLink = page.locator('section a[href="/"]').filter({ hasText: 'Back to Home' });
    await expect(backLink).toBeVisible();
  });

  test('footer email link has correct href', async ({ page }) => {
    await page.goto('/');
    const emailLink = page.locator('footer a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:leoneldlourenco@outlook.com');
  });

  test('footer LinkedIn link has correct href and opens in new tab', async ({ page }) => {
    await page.goto('/');
    const linkedinLink = page.locator('footer a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', /noopener/);
  });

  test.describe('external links have target="_blank" and rel="noopener"', () => {
    for (const pg of ALL_PAGES) {
      test(`${pg.name}: external links are safe`, async ({ page }) => {
        await page.goto(pg.path);
        const externalLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a[href^="http"]'));
          return links
            .filter((a) => !a.closest('astro-island'))
            .map((a) => ({
              href: a.getAttribute('href'),
              target: a.getAttribute('target'),
              rel: a.getAttribute('rel'),
            }));
        });
        for (const link of externalLinks) {
          expect(link.target, `${link.href} missing target="_blank"`).toBe('_blank');
          expect(link.rel, `${link.href} missing rel="noopener"`).toMatch(/noopener/);
        }
      });
    }
  });
});
