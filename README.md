# Leonel Lourenco Portfolio

A Swiss-Modern portfolio website showcasing 4 flagship projects with interactive sandbox demos.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Portfolio/
├── src/
│   ├── pages/              # Astro pages
│   ├── layouts/            # Page layouts
│   ├── components/         # Astro & React components
│   │   └── demos/          # Interactive demo components
│   ├── data/               # JSON data files
│   ├── styles/             # Global CSS
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
├── Architecture.md         # System architecture document
├── Data_Dictionary.md      # Component & function reference
└── package.json
```

## Featured Projects

1. **BrainWave** - AI tutoring platform (pre-canned chat demo)
2. **Spec2CAD2** - CAD automation system (JSON editor + 3D viewer)
3. **Otto_2** - Shopify automation (before/after slider)
4. **Phantom** - Local voice assistant (video demo)

## Design System

- **Colors**: Black (#000), White (#FFF), Electric Blue (#0066FF) accent
- **Typography**: Inter (sans-serif), JetBrains Mono (code)
- **Style**: Swiss-Modern, card-based, minimal

## Deployment

Hosted on **GitHub Pages** with automated CI/CD via GitHub Actions.

**Live site:** https://leonellourenco.com

### How it works

1. Push to `main` branch triggers `.github/workflows/deploy.yml`
2. GitHub Actions builds the Astro site (`npm ci` + `npm run build`)
3. Built artifacts are deployed to GitHub Pages automatically
4. Custom domain `leonellourenco.com` is configured via `public/CNAME`

### Manual build (local preview)

```bash
npm run build
npm run preview
```

## Assets Needed

Before full deployment, add:
- `/public/images/brainwave/thumbnail.png`
- `/public/images/spec2cad/thumbnail.png`
- `/public/images/otto/thumbnail.png`
- `/public/images/phantom/thumbnail.png`
- `/public/videos/phantom-demo.mp4`
- `/public/favicon.ico`
- `/public/og-image.png`

## License

MIT © Leonel Lourenco
