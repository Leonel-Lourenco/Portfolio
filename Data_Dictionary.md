# Portfolio Data Dictionary

**Version:** 1.1  
**Last Updated:** March 24, 2026  
**Purpose:** Complete reference for all variables, functions, components, and data structures

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Components](#components)
3. [Data Structures](#data-structures)
4. [Utility Functions](#utility-functions)
5. [Type Definitions](#type-definitions)

---

## Design Tokens

### CSS Custom Properties

```css
/* Colors */
--color-primary: #000000;      /* Black - text, headers */
--color-secondary: #FFFFFF;    /* White - backgrounds */
--color-accent: #0066FF;       /* Electric Blue - subtle accents */
--color-muted: #666666;        /* Gray - secondary text */
--color-border: #E5E5E5;       /* Light gray - borders */

/* Typography */
--font-sans: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;

/* Font Sizes */
--text-xs: 0.75rem;            /* 12px */
--text-sm: 0.875rem;           /* 14px */
--text-base: 1rem;             /* 16px */
--text-lg: 1.125rem;           /* 18px */
--text-xl: 1.25rem;            /* 20px */
--text-2xl: 1.5rem;            /* 24px */
--text-3xl: 1.875rem;          /* 30px */
--text-4xl: 2.25rem;           /* 36px */
--text-5xl: 3rem;              /* 48px */
--text-6xl: 3.75rem;           /* 60px */
--text-7xl: 4.5rem;            /* 72px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-bold: 700;

/* Spacing */
--space-1: 0.25rem;            /* 4px */
--space-2: 0.5rem;             /* 8px */
--space-3: 0.75rem;            /* 12px */
--space-4: 1rem;               /* 16px */
--space-6: 1.5rem;             /* 24px */
--space-8: 2rem;               /* 32px */
--space-12: 3rem;              /* 48px */
--space-16: 4rem;              /* 64px */
--space-24: 6rem;              /* 96px */

/* Layout */
--max-width: 1200px;
--grid-columns: 12;
--grid-gutter: 24px;

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

---

## Components

### Layout Components

#### `Layout.astro`
Base HTML wrapper for all pages.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Page title for `<title>` tag |
| `description` | `string` | No | Site default | Meta description |
| `ogImage` | `string` | No | `/og-image.png` | Open Graph image |

```astro
<Layout title="Home | Leonel Lourenco">
  <slot />
</Layout>
```

---

#### `Header.astro`
Site navigation bar.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentPath` | `string` | No | - | Current page path for active state |

**Structure:**
```
┌──────────────────────────────────────────────────┐
│  [Logo]          Projects  About       [Contact] │
└──────────────────────────────────────────────────┘
```

**Navigation Items:**
```typescript
const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" }
];
```

---

#### `Footer.astro`
Site footer with copyright and links.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| None | - | - | - | - |

**Structure:**
```
┌──────────────────────────────────────────────────┐
│  © 2026 Leonel Lourenco     Email | LinkedIn     │
└──────────────────────────────────────────────────┘
```

---

### UI Components

#### `Hero.astro`
Homepage hero section with kinetic typography.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | Yes | - | Name to display |
| `tagline` | `string` | Yes | - | Subtitle text |

**Animation Sequence:**
1. Grid pattern fades in (0-300ms)
2. Name letters animate in sequentially (300-800ms)
3. Tagline fades up (800-1100ms)

---

#### `ProjectCard.astro`
Card component for project previews.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Project name |
| `description` | `string` | Yes | - | One-line description |
| `thumbnail` | `string` | Yes | - | Image path |
| `href` | `string` | Yes | - | Link to project page |
| `tags` | `string[]` | No | `[]` | Technology tags |
| `underConstruction` | `boolean` | No | `false` | Shows 🚧 overlay on thumbnail for pages with pending content |
| `phantomHighlight` | `boolean` | No | `false` | Shows purple gradient + 👻 overlay on thumbnail |

**Structure:**
```
┌─────────────────────────────┐
│  [Thumbnail Image]          │
│                             │
├─────────────────────────────┤
│  Title                      │
│  Description text here...   │
│                             │
│  React • Flask • SQLite     │
│                             │
│  [Explore →]                │
└─────────────────────────────┘
```

**Hover Effects:**
- Card lifts with shadow
- Subtle 3D tilt (transform: perspective)
- Thumbnail scales slightly

---

#### `Badge.astro`
Small status indicator badge.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | - | Badge text |
| `variant` | `"default" \| "accent"` | No | `"default"` | Style variant |

---

#### `Button.astro`
Reusable button component.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `href` | `string` | No | - | If provided, renders as `<a>` |
| `variant` | `"primary" \| "secondary" \| "ghost"` | No | `"primary"` | Style variant |
| `size` | `"sm" \| "md" \| "lg"` | No | `"md"` | Size variant |

**Variants:**
- `primary`: Black background, white text
- `secondary`: White background, black border
- `ghost`: Transparent, text only

---

### Demo Components (React Islands)

#### `BrainwaveChat.tsx`
Interactive chat interface with pre-canned AI responses.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `responses` | `ResponseMap` | Yes | - | Q&A response data |

**State:**
```typescript
interface ChatState {
  messages: Message[];      // Chat history
  inputValue: string;       // Current input
  isTyping: boolean;        // AI typing indicator
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

**Methods:**
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `handleSend` | `void` | `void` | Send current input |
| `findResponse` | `query: string` | `string` | Match query to response |
| `simulateTyping` | `text: string` | `Promise<void>` | Type text with delay |

---

#### `Spec2CADEditor.tsx`
Monaco editor paired with Three.js 3D model viewer.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `models` | `ModelMapping[]` | Yes | - | Available pre-generated models |
| `defaultSpec` | `string` | Yes | - | Initial JSON spec |

**State:**
```typescript
interface EditorState {
  specJson: string;           // Current JSON in editor
  currentModel: string;       // Path to current .glb
  isLoading: boolean;         // Model loading state
  error: string | null;       // Validation errors
}
```

**Methods:**
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `handleSpecChange` | `value: string` | `void` | Update spec JSON |
| `generateModel` | `void` | `void` | Find matching model |
| `matchSpec` | `spec: Spec` | `string` | Hash spec → model path |
| `resetSpec` | `void` | `void` | Reset to default |

---

#### `OttoSlider.tsx`
Before/after image comparison slider.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `examples` | `SliderExample[]` | Yes | - | Store examples |

**State:**
```typescript
interface SliderState {
  activeExample: number;      // Current example index
  sliderPosition: number;     // 0-100 percentage
}

interface SliderExample {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  annotations: Annotation[];
}

interface Annotation {
  text: string;
  position: { x: number; y: number };
}
```

**Methods:**
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `handleSliderMove` | `position: number` | `void` | Update slider |
| `selectExample` | `index: number` | `void` | Switch examples |

---

#### `PhantomVideo.tsx`
Custom video player with chapter navigation.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | Yes | - | Video source URL |
| `chapters` | `Chapter[]` | Yes | - | Chapter markers |
| `poster` | `string` | No | - | Thumbnail image |

**State:**
```typescript
interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

interface Chapter {
  title: string;
  startTime: number;        // Seconds
  endTime: number;
}
```

**Methods:**
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `play` | `void` | `void` | Start playback |
| `pause` | `void` | `void` | Pause playback |
| `seekTo` | `time: number` | `void` | Jump to timestamp |
| `jumpToChapter` | `index: number` | `void` | Go to chapter start |

---

## Data Structures

### `projects.json`

```typescript
interface Project {
  id: string;                 // Unique identifier
  title: string;              // Display name
  slug: string;               // URL slug
  description: string;        // One-line description
  longDescription: string;    // Full description for project page
  thumbnail: string;          // Card image path
  demoType: "chat" | "editor" | "slider" | "video";
  tags: string[];             // Technology tags
  features: string[];         // Key features list
}
```

**Example:**
```json
{
  "projects": [
    {
      "id": "brainwave",
      "title": "BrainWave",
      "slug": "brainwave",
      "description": "AI-powered tutoring platform for elementary students",
      "longDescription": "A COPPA-compliant educational platform...",
      "thumbnail": "/images/brainwave/thumbnail.png",
      "demoType": "chat",
      "tags": ["React", "Flask", "SQLite", "OpenAI"],
      "features": [
        "Real-time AI tutoring",
        "Progress tracking",
        "Parent dashboard",
        "COPPA compliant"
      ]
    }
  ]
}
```

---

### `brainwave-responses.json`

```typescript
interface ResponseData {
  welcomeMessage: string;
  fallbackResponse: string;
  responses: ResponseEntry[];
}

interface ResponseEntry {
  patterns: string[];         // Trigger phrases (lowercase)
  response: string;           // AI response text
  category: "math" | "science" | "reading" | "general";
}
```

**Example:**
```json
{
  "welcomeMessage": "Hi! I'm BrainWave. Ask me about math, science, or reading! 📚",
  "fallbackResponse": "Great question! In the full app, I'd help you work through that step by step.",
  "responses": [
    {
      "patterns": ["what is 7 times 8", "7 x 8", "7*8", "7 × 8"],
      "response": "Great question! 7 × 8 = 56. Think of it as 7 groups of 8 items each. You could also remember it as 56 = 7 × 8 (5, 6, 7, 8 in order)!",
      "category": "math"
    }
  ]
}
```

---

### `spec2cad-models.json`

```typescript
interface ModelData {
  defaultSpec: object;        // Initial JSON spec
  models: ModelEntry[];
}

interface ModelEntry {
  id: string;                 // Unique model ID
  path: string;               // Path to .glb file
  parameters: {
    width: number;
    depth: number;
    height: number;
    features: string[];       // Feature types present
  };
  hash: string;               // Parameter hash for matching
}
```

**Matching Algorithm:**
```typescript
function matchSpec(spec: Spec): string {
  // 1. Extract key parameters from spec
  const params = extractParams(spec);
  
  // 2. Calculate distance to each pre-generated model
  const distances = models.map(m => ({
    model: m,
    distance: calculateDistance(params, m.parameters)
  }));
  
  // 3. Return closest match
  return distances.sort((a, b) => a.distance - b.distance)[0].model.path;
}
```

---

## Utility Functions

### `src/utils/animations.ts`

#### `staggerChildren`
Creates staggered animation for child elements.

```typescript
function staggerChildren(
  delay: number = 0.1,
  duration: number = 0.5
): AnimationConfig
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `delay` | `number` | `0.1` | Delay between children (seconds) |
| `duration` | `number` | `0.5` | Animation duration |

---

#### `fadeInUp`
Fade in with upward motion.

```typescript
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

---

### `src/utils/chat.ts`

#### `findBestMatch`
Find best matching response for user query.

```typescript
function findBestMatch(
  query: string,
  responses: ResponseEntry[]
): ResponseEntry | null
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | `string` | User's input text |
| `responses` | `ResponseEntry[]` | Available responses |

**Returns:** Best matching response or `null` if no match found.

---

#### `formatMessage`
Create a properly formatted chat message.

```typescript
function formatMessage(
  content: string,
  role: "user" | "assistant"
): Message
```

---

### `src/utils/model-matching.ts`

#### `hashSpec`
Generate hash from spec parameters for model matching.

```typescript
function hashSpec(spec: Spec): string
```

---

#### `calculateDistance`
Calculate distance between spec and model parameters.

```typescript
function calculateDistance(
  spec: SpecParams,
  model: ModelParams
): number
```

---

## Type Definitions

### `src/types/index.ts`

```typescript
// Project types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  demoType: DemoType;
  tags: string[];
  features: string[];
}

export type DemoType = "chat" | "editor" | "slider" | "video";

// Chat types
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ResponseEntry {
  patterns: string[];
  response: string;
  category: "math" | "science" | "reading" | "general";
}

// Spec2CAD types
export interface Spec {
  base: {
    width: number;
    depth: number;
    height: number;
  };
  features: Feature[];
}

export interface Feature {
  type: "hole" | "pocket" | "slot" | "chamfer" | "fillet";
  [key: string]: unknown;
}

export interface ModelEntry {
  id: string;
  path: string;
  parameters: SpecParams;
  hash: string;
}

// Video types
export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

// Slider types
export interface SliderExample {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  annotations: Annotation[];
}

export interface Annotation {
  text: string;
  position: { x: number; y: number };
}
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Astro pages | `kebab-case.astro` | `about.astro` |
| Astro components | `PascalCase.astro` | `ProjectCard.astro` |
| React components | `PascalCase.tsx` | `BrainwaveChat.tsx` |
| Utilities | `kebab-case.ts` | `model-matching.ts` |
| Types | `kebab-case.ts` | `index.ts` in `types/` |
| Data files | `kebab-case.json` | `brainwave-responses.json` |
| Images | `kebab-case.ext` | `thumbnail-brainwave.png` |

---

## Deployment Configuration

### `public/CNAME`
Custom domain file for GitHub Pages.

| Field | Value |
|-------|-------|
| Content | `leonellourenco.com` |
| Purpose | Tells GitHub Pages to serve site on custom domain |
| Copied to | `dist/CNAME` at build time (Astro copies `public/` contents) |

### `.github/workflows/deploy.yml`
GitHub Actions CI/CD pipeline.

| Field | Value |
|-------|-------|
| Trigger | Push to `main` branch, or manual dispatch |
| Node version | 20 |
| Build command | `npm ci` + `npm run build` |
| Deploy target | GitHub Pages via `actions/deploy-pages@v4` |
| Permissions | `contents: read`, `pages: write`, `id-token: write` |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_SITE_URL` | Yes | Production site URL (`https://leonellourenco.com`) |
| `PUBLIC_GA_ID` | No | Google Analytics ID |

---

## Testing Infrastructure

### Test Configuration (`playwright.config.ts`)

| Property | Value | Description |
|----------|-------|-------------|
| `testDir` | `./tests/e2e` | Test file directory |
| `baseURL` | `http://localhost:4321` | Preview server URL |
| `browserName` | `chromium` | Browser engine for all projects |
| `maxDiffPixelRatio` | `0.01` | Visual regression tolerance (1%) |
| `retries` | `2` (CI) / `0` (local) | Retry count by environment |
| `workers` | `1` (CI) / `auto` (local) | Parallelism by environment |

### Test Files

| File | Tests | Description |
|------|-------|-------------|
| `build-health.spec.ts` | 5 | Build output and dist file verification |
| `navigation.spec.ts` | ~30 | Header, footer, links, mobile menu, external link safety |
| `homepage.spec.ts` | ~15 | Hero, project cards grid, CTA section |
| `about.spec.ts` | ~10 | Bio, skills, contact buttons, availability badge |
| `project-brainwave.spec.ts` | ~12 | BrainWave page content and video demo |
| `project-spec2cad.spec.ts` | ~12 | Spec2CAD page content and video demo |
| `project-otto.spec.ts` | ~15 | Otto page content, video demo, contact section |
| `project-phantom.spec.ts` | ~12 | Phantom page content and video demo |
| `seo-meta.spec.ts` | ~48 | Meta tags, OG, Twitter Card, canonical per page |
| `accessibility.spec.ts` | ~30 | Alt text, headings, keyboard nav, aria-labels |
| `visual-regression.spec.ts` | 24 | Full-page screenshot baselines (6 pages × 4 viewports) |
| `performance.spec.ts` | ~15 | Load times, console errors, broken links, images |

### Visual Regression Baselines

Stored in `tests/e2e/visual-regression.spec.ts-snapshots/`. Naming convention: `{route}-{viewport}-{project}-{platform}.png`.

| Route | mobile | tablet | desktop | wide |
|-------|--------|--------|---------|------|
| homepage | ✓ | ✓ | ✓ | ✓ |
| about | ✓ | ✓ | ✓ | ✓ |
| project-brainwave | ✓ | ✓ | ✓ | ✓ |
| project-spec2cad | ✓ | ✓ | ✓ | ✓ |
| project-otto | ✓ | ✓ | ✓ | ✓ |
| project-phantom | ✓ | ✓ | ✓ | ✓ |

### Console Error Ignore Patterns

Tests filter out known non-actionable console errors from Vite preview server:

| Pattern | Reason |
|---------|--------|
| `Failed to load resource` | Video/asset 404s on preview server |
| `astro-island.*Error hydrating` | Transient hydration errors in preview |
| `Failed to fetch dynamically imported module` | Vite dep optimization race |
| `Outdated Optimize Dep` | Stale Vite dependency cache |

---

*End of Data Dictionary*
