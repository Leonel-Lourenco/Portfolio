import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..', '..');
const DIST = join(ROOT, 'dist');

test.describe('Build Health', () => {
  test('astro build completes without errors', () => {
    const result = execSync('npm run build', {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 120_000,
    });
    expect(result).toBeDefined();
  });

  test('dist directory contains expected page HTML files', () => {
    const expectedFiles = [
      'index.html',
      'about/index.html',
      'projects/brainwave/index.html',
      'projects/spec2cad/index.html',
      'projects/otto/index.html',
      'projects/phantom/index.html',
    ];

    for (const file of expectedFiles) {
      const filePath = join(DIST, file);
      expect(existsSync(filePath), `Missing: dist/${file}`).toBe(true);
    }
  });

  test('CNAME file exists in dist', () => {
    expect(existsSync(join(DIST, 'CNAME'))).toBe(true);
  });

  test('robots.txt exists in dist', () => {
    expect(existsSync(join(DIST, 'robots.txt'))).toBe(true);
  });

  test('favicon.ico exists in dist', () => {
    expect(existsSync(join(DIST, 'favicon.ico'))).toBe(true);
  });
});
