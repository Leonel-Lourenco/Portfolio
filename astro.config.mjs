import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://leonellourenco.com',
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
