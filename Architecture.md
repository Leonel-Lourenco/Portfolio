# Portfolio Architecture

**Version:** 1.2  
**Last Updated:** March 24, 2026  
**Purpose:** Single source of truth for Leonel Lourenco's portfolio website

**Live Site:** https://leonellourenco.com  
**Repository:** https://github.com/Leonel-Lourenco/Portfolio

---

## Overview

A Swiss-Modern portfolio website showcasing 4 flagship projects with interactive sandbox demos. Designed to impress recruiters and collaborators via QR code or direct link access.

### Core Principles

1. **Swiss-Modern Design** — Grid systems, sans-serif typography, minimal color palette
2. **Interactive Demos** — Hands-on sandbox experiences over passive viewing
3. **Performance First** — Sub-2-second load times, 95+ Lighthouse scores
4. **Zero Runtime Cost** — Static generation, no server-side compute
5. **Single Source of Truth** — This document guides all decisions

---

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PORTFOLIO WEBSITE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                         ASTRO STATIC SITE                             │  │
│   │                                                                       │  │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │  │
│   │   │   PAGES     │  │ COMPONENTS  │  │    DATA     │                  │  │
│   │   │             │  │             │  │             │                  │  │
│   │   │ • index     │  │ • Layout    │  │ • projects  │                  │  │
│   │   │ • about     │  │ • Header    │  │ • responses │                  │  │
│   │   │ • projects/ │  │ • Cards     │  │ • models    │                  │  │
│   │   │   - brain   │  │ • Demos     │  │             │                  │  │
│   │   │   - spec    │  │             │  │             │                  │  │
│   │   │   - otto    │  │             │  │             │                  │  │
│   │   │   - phantom │  │             │  │             │                  │  │
│   │   └─────────────┘  └─────────────┘  └─────────────┘                  │  │
│   │                                                                       │  │
│   │   ┌───────────────────────────────────────────────────────────────┐  │  │
│   │   │                    INTERACTIVE ISLANDS                         │  │  │
│   │   │                                                                │  │  │
│   │   │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │  │  │
│   │   │  │ BrainWave    │ │ Spec2CAD     │ │ Otto         │           │  │  │
│   │   │  │ Chat (React) │ │ Editor+3D    │ │ Slider       │           │  │  │
│   │   │  │              │ │ (React)      │ │ (React)      │           │  │  │
│   │   │  └──────────────┘ └──────────────┘ └──────────────┘           │  │  │
│   │   │                                                                │  │  │
│   │   └───────────────────────────────────────────────────────────────┘  │  │
│   │                                                                       │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                      │                                       │
│                                      ▼                                       │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                         BUILD OUTPUT                                  │  │
│   │                    Static HTML/CSS/JS Bundle                          │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                      │                                       │
└──────────────────────────────────────┼───────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GITHUB PAGES HOSTING                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   [Namecheap DNS]  ──►  leonellourenco.com                                  │
│       │                                                                      │
│       ▼                                                                      │
│   [GitHub Pages CDN]  ──►  Global edge delivery + HTTPS                     │
│       │                                                                      │
│       ▼                                                                      │
│   [GitHub Actions]  ──►  Build & deploy on push to main                     │
│                                                                              │
│   [Let's Encrypt]  ──►  Free SSL certificate (auto-managed)                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design System

### Color Palette

```
┌────────────────────────────────────────────────────────┐
│                    COLOR TOKENS                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  --color-primary:     #000000  (Black)                 │
│  --color-secondary:   #FFFFFF  (White)                 │
│  --color-accent:      #0066FF  (Electric Blue)         │
│  --color-muted:       #666666  (Gray text)             │
│  --color-border:      #E5E5E5  (Light borders)         │
│                                                         │
│  Usage ratio: 95% black/white, 5% accent               │
│                                                         │
│  Accent appears on:                                     │
│  • Link hover states                                    │
│  • Active navigation indicator                          │
│  • Button hover backgrounds                             │
│  • Subtle underlines/borders                            │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### Typography

```
┌────────────────────────────────────────────────────────┐
│                   TYPOGRAPHY SCALE                      │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Font Family:                                           │
│  --font-sans:  "Inter", system-ui, sans-serif          │
│  --font-mono:  "JetBrains Mono", monospace             │
│                                                         │
│  Font Sizes (rem):                                      │
│  --text-xs:    0.75    (12px)                          │
│  --text-sm:    0.875   (14px)                          │
│  --text-base:  1       (16px)                          │
│  --text-lg:    1.125   (18px)                          │
│  --text-xl:    1.25    (20px)                          │
│  --text-2xl:   1.5     (24px)                          │
│  --text-3xl:   1.875   (30px)                          │
│  --text-4xl:   2.25    (36px)                          │
│  --text-5xl:   3       (48px)                          │
│  --text-6xl:   3.75    (60px)                          │
│  --text-7xl:   4.5     (72px)                          │
│                                                         │
│  Font Weights:                                          │
│  --font-normal:  400                                    │
│  --font-medium:  500                                    │
│  --font-bold:    700                                    │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### Spacing Scale

```
┌────────────────────────────────────────────────────────┐
│                    SPACING TOKENS                       │
├────────────────────────────────────────────────────────┤
│                                                         │
│  --space-1:   0.25rem   (4px)                          │
│  --space-2:   0.5rem    (8px)                          │
│  --space-3:   0.75rem   (12px)                         │
│  --space-4:   1rem      (16px)                         │
│  --space-6:   1.5rem    (24px)                         │
│  --space-8:   2rem      (32px)                         │
│  --space-12:  3rem      (48px)                         │
│  --space-16:  4rem      (64px)                         │
│  --space-24:  6rem      (96px)                         │
│                                                         │
│  Grid:                                                  │
│  --grid-columns: 12                                     │
│  --grid-gutter:  24px                                   │
│  --max-width:    1200px                                 │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD pipeline
├── Architecture.md              # THIS DOCUMENT
├── Data_Dictionary.md           # All variables, functions, components
├── README.md                    # Setup instructions
│
├── src/
│   ├── pages/
│   │   ├── index.astro          # Homepage: hero + project cards
│   │   ├── about.astro          # About + contact info
│   │   └── projects/
│   │       ├── brainwave.astro  # BrainWave demo page
│   │       ├── spec2cad.astro   # Spec2CAD2 demo page
│   │       ├── otto.astro       # Otto_2 demo page
│   │       └── phantom.astro    # Phantom demo page
│   │
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML wrapper
│   │
│   ├── components/
│   │   ├── Header.astro         # Navigation bar
│   │   ├── Footer.astro         # Footer with links
│   │   ├── Hero.astro           # Kinetic typography hero
│   │   ├── ProjectCard.astro    # Project preview card
│   │   └── Badge.astro          # Status/availability badge
│   │
│   ├── components/demos/        # Interactive React islands
│   │   ├── BrainwaveChat.tsx    # Pre-canned AI chat
│   │   ├── Spec2CADEditor.tsx   # Monaco + Three.js viewer
│   │   ├── OttoSlider.tsx       # Before/after comparison
│   │   └── PhantomVideo.tsx     # Custom video player
│   │
│   ├── data/
│   │   ├── projects.json        # Project metadata
│   │   ├── brainwave-responses.json  # 50+ Q&A pairs
│   │   └── spec2cad-models.json      # Model parameter mappings
│   │
│   ├── styles/
│   │   └── global.css           # Design tokens + base styles
│   │
│   └── assets/
│       ├── models/              # Pre-generated 3D models (.glb)
│       ├── videos/              # Phantom demo video
│       ├── images/              # Screenshots, thumbnails
│       │   ├── brainwave/
│       │   ├── spec2cad/
│       │   ├── otto/
│       │   └── phantom/
│       └── fonts/               # Inter, JetBrains Mono (if self-hosted)
│
├── public/
│   ├── CNAME                    # Custom domain for GitHub Pages
│   ├── favicon.ico
│   ├── og-image.png             # Social sharing preview
│   └── robots.txt
│
├── astro.config.mjs             # Astro configuration
├── tailwind.config.mjs          # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

---

## Component Architecture

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         EVERY PAGE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   <Layout>                                                       │
│   │                                                              │
│   ├── <Header />                                                 │
│   │   └── Logo | Nav Links | Contact Button                     │
│   │                                                              │
│   ├── <main>                                                     │
│   │   └── {Page-specific content}                                │
│   │                                                              │
│   └── <Footer />                                                 │
│       └── Copyright | Social Links                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Homepage Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                         HERO SECTION                             │
│                                                                  │
│           ╔═══════════════════════════════════╗                 │
│           ║                                   ║                 │
│           ║      LEONEL LOURENCO             ║                 │
│           ║                                   ║                 │
│           ║   Full-Stack Engineer • NJIT      ║                 │
│           ║                                   ║                 │
│           ╚═══════════════════════════════════╝                 │
│                                                                  │
│           Kinetic typography animation on load                   │
│           Subtle grid pattern background                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                       PROJECT CARDS                              │
│                                                                  │
│   ┌─────────────────┐  ┌─────────────────┐                      │
│   │                 │  │                 │                      │
│   │   BrainWave     │  │   Spec2CAD2     │                      │
│   │                 │  │                 │                      │
│   │   AI Tutoring   │  │   CAD Automation│                      │
│   │   Platform      │  │   System        │                      │
│   │                 │  │                 │                      │
│   │   [Explore →]   │  │   [Explore →]   │                      │
│   └─────────────────┘  └─────────────────┘                      │
│                                                                  │
│   ┌─────────────────┐  ┌─────────────────┐                      │
│   │                 │  │                 │                      │
│   │   Otto_2        │  │   Phantom       │                      │
│   │                 │  │                 │                      │
│   │   Shopify       │  │   Local Voice   │                      │
│   │   Automation    │  │   Assistant     │                      │
│   │                 │  │                 │                      │
│   │   [Explore →]   │  │   [Explore →]   │                      │
│   └─────────────────┘  └─────────────────┘                      │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Project Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ← Back to Projects                                             │
│                                                                  │
│   PROJECT TITLE                                                  │
│   One-line description of the project                            │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                          │   │
│   │                   SANDBOX DEMO                           │   │
│   │                                                          │   │
│   │   (Interactive component - React island)                 │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   ABOUT THIS PROJECT                                             │
│   ─────────────────────────────────────────                     │
│   Brief description, tech stack, key features                   │
│                                                                  │
│   Tech: React • Flask • SQLite • OpenAI                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Specifications

### 1. BrainWave Video Demo

```
Type: Video player with chapter navigation
Framework: React (Astro island)

Data: brainwave-demo.mp4
├── Duration: ~2 minutes
└── Chapter markers in code

Flow:
1. User sees video thumbnail with play button
2. Click to play
3. Chapter markers in progress bar
4. Click chapter to jump to section

Chapters:
- 0:00 Welcome & Chat Interface
- 0:30 Math Tutoring Demo
- 1:00 Practice Test Mode
- 1:30 Progress Tracking

UI:
┌────────────────────────────────────────┐
│  ┌────────────────────────────────┐    │
│  │                                │    │
│  │         [Video]                │    │
│  │                                │    │
│  ├────────────────────────────────┤    │
│  │  ▶ 0:00 ──●────────────── 2:00 │    │
│  │       ▲   ▲    ▲    ▲          │    │
│  │       │   │    │    │          │    │
│  │       Chapters                 │    │
│  └────────────────────────────────┘    │
│                                        │
│  • Welcome  • Math  • Test  • Progress │
└────────────────────────────────────────┘
```

### 2. Spec2CAD Part Gallery Demo

```
Type: Part selection with step-by-step build animation
Framework: React + Three.js + three-bvh-csg

Data: Pre-defined parts in component
├── 4 example parts (Mounting Plate, Bracket, Enclosure, Shaft Support)
├── Each part has spec + build steps
└── CSG operations for holes, pockets, slots

Flow:
1. User sees parts gallery with 4 pre-made parts
2. User selects a part
3. Animation auto-plays showing construction steps
4. Base block appears first, then features added sequentially
5. Progress bar shows current operation
6. "Replay" button to watch again

UI:
┌──────────────────────┬─────────────────────┐
│  Parts Gallery       │  Three.js Viewer    │
│  ───────────────     │  ───────────────    │
│  [🔩 Mounting Plate] │                     │
│  [📐 L-Bracket]      │    [3D Model]       │
│  [📦 Enclosure]      │    (rotating)       │
│  [⚙️ Shaft Support]  │                     │
│                      │    [Orbit Controls] │
├──────────────────────┴─────────────────────┤
│  "Drilling hole 2..."  [━━━━━━░░░] 4/6     │
│  ○ ○ ● ○ ○ ○  [↻ Replay]                   │
└────────────────────────────────────────────┘

Pipeline Attribution Banner:
"All parts shown were generated by the Spec2CAD pipeline"
```

### 3. Otto Slider Demo

```
Type: Before/after comparison slider with testimonials
Framework: React

Data: 3 store examples (inline CSS-based mockups)
├── Uglified template (Comic Sans, clashing colors)
├── Prettified Otto-generated store
└── Testimonials section (before/after styling)

Flow:
1. User sees split view with slider handle
2. Drag slider to reveal before/after (handle synced with view)
3. Annotation overlays highlight AI-generated elements
4. Tabs to switch between 3 example stores
5. Scroll down to see testimonials comparison
6. Contact section at page bottom

UI:
┌────────────────────────────────────────┐
│  [Store 1] [Store 2] [Store 3]         │
├────────────────────────────────────────┤
│  ┌─────────────┬─────────────┐         │
│  │   AFTER     │   BEFORE    │         │
│  │  (Pretty)   │   (Ugly)    │         │
│  │     ◄───────┼───────►     │         │
│  └─────────────┴─────────────┘         │
│  ● AI-generated improvements           │
├────────────────────────────────────────┤
│  Customer Testimonials                 │
│  ┌──────────┐  ┌──────────┐            │
│  │ BEFORE   │  │ AFTER    │            │
│  │ (ugly)   │  │ (clean)  │            │
│  └──────────┘  └──────────┘            │
└────────────────────────────────────────┘

Otto Page also includes:
- Contact section with mailto + LinkedIn/GitHub links
```

### 4. Phantom Video Demo

```
Type: Custom video player with chapters
Framework: React

Data: phantom-demo.mp4
├── Duration: ~2-3 minutes
└── Chapter markers in code

Flow:
1. User sees video thumbnail
2. Click to play
3. Chapter markers in progress bar
4. Click chapter to jump to section

Chapters:
- 0:00 Wake word detection
- 0:30 Voice transcription  
- 1:00 Calendar integration
- 1:45 Phone reminder demo

UI:
┌────────────────────────────────────────┐
│  ┌────────────────────────────────┐    │
│  │                                │    │
│  │         [Video]                │    │
│  │                                │    │
│  ├────────────────────────────────┤    │
│  │  ▶ 0:00 ──●────────────── 2:45 │    │
│  │       ▲   ▲    ▲    ▲          │    │
│  │       │   │    │    │          │    │
│  │       Chapters                 │    │
│  └────────────────────────────────┘    │
│                                        │
│  • Wake Word  • Transcription          │
│  • Calendar   • Reminders              │
└────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Astro | 4.x | Static site generation |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| UI Components | React | 18.x | Interactive islands |
| 3D Rendering | Three.js | Latest | Spec2CAD model viewer |
| Code Editor | Monaco Editor | Latest | JSON editing |
| Animations | Framer Motion | Latest | Smooth transitions |
| Icons | Lucide React | Latest | Clean geometric icons |
| Build | Vite | 5.x | Bundling (via Astro) |
| Types | TypeScript | 5.x | Type safety |

---

## GitHub Pages Infrastructure

### Services Used

| Service | Purpose | Cost |
|---------|---------|------|
| GitHub Pages | Static site hosting + CDN | Free |
| GitHub Actions | CI/CD build & deploy | Free (2,000 min/month) |
| Namecheap | Domain registration + DNS | ~$12/year |
| Let's Encrypt | SSL certificate (via GitHub) | Free |

**Total: ~$12/year (domain only)**

### Deployment Flow

```
Push to main branch
      │
      ▼
┌──────────────────┐
│  GitHub Actions  │  → .github/workflows/deploy.yml
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  npm ci + build  │  → Generates /dist folder
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  deploy-pages    │  → Uploads artifact to GitHub Pages
└──────────────────┘
      │
      ▼
    Live at https://leonellourenco.com
```

### Deploy Trigger

Deployment is **automatic** on every push to `main`. Can also be triggered manually via GitHub Actions "Run workflow" button.

### Custom Domain Configuration

- **CNAME file**: `public/CNAME` contains `leonellourenco.com`
- **Namecheap DNS**: A records → GitHub Pages IPs, CNAME `www` → `Leonel-Lourenco.github.io`
- **HTTPS**: Enforced via GitHub Pages settings (Let's Encrypt auto-provisioned)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Time to Interactive | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 95+ |
| Bundle Size (initial) | < 200KB |

---

## Content

### Personal Info

| Field | Value |
|-------|-------|
| Name | Leonel Lourenco |
| Title | Full-Stack Engineer |
| Email | leoneldlourenco@outlook.com |
| LinkedIn | https://www.linkedin.com/in/leonel-lourenco/ |
| Domain | leonellourenco.com |

### Bio

> I'm Leonel Lourenco, a full-stack engineer and Information Systems student at NJIT with a passion for building production-ready systems. I've deployed cloud infrastructure on AWS, developed AI-powered applications, and supported enterprise network operations for over 12,000 users. I love tackling complex problems — from COPPA-compliant EdTech platforms to offline voice assistants — and turning ideas into polished, scalable products.

---

*End of Architecture Document*
