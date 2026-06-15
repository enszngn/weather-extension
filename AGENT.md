# AGENT.md — Weather New Tab Extension

> **Every agent working on this project MUST log their actions at the bottom of this file under the [Agent Activity Log](#agent-activity-log) section.**

---

## Project Overview

**Weather New Tab** is a lightweight browser extension built with [WXT](https://wxt.dev/) + React + TypeScript. It replaces the browser's New Tab page with a beautiful, fast-loading weather dashboard that connects to a dedicated weather API backend.

- **Extension Framework**: WXT (Web Extension Tools) `v0.20+`
- **UI Layer**: React 19 + TypeScript
- **Styling**: Vanilla CSS (no Tailwind, no CSS-in-JS)
- **Backend**: Cloudflare Worker at `weather-insights.eneszengin542.workers.dev`
- **Supported Browsers**: Chrome (primary), Firefox, Safari, Edge

---

## Core Principles

### 1. Lightweight & Fast First
- **Bundle size is a first-class concern.** Every dependency added must justify its weight.
- No heavy UI libraries (no MUI, Chakra, Ant Design, etc.).
- Prefer native browser APIs over polyfills or libraries.
- Lazy-load anything that is not critical to the initial paint.
- The New Tab page must reach a usable state (weather data visible) in **< 500ms** on a typical connection.
- Cache API responses aggressively using `browser.storage.local` to avoid unnecessary network calls on every new tab open.

### 2. Modularity
- **One responsibility per file.** Components, hooks, utilities, and types each live in their own well-named file.
- Follow this folder structure strictly:

```
entrypoints/
  newtab/
    App.tsx           # Root component — composes layout only
    main.tsx          # Mount point
    index.html
    App.css
  popup/
    App.tsx           # Settings / quick actions
    main.tsx
    index.html
    App.css
    style.css

components/           # Shared, reusable React components
  WeatherCard/
    WeatherCard.tsx
    WeatherCard.css
  WeatherIcon/
    WeatherIcon.tsx
  Clock/
    Clock.tsx
    Clock.css
  ...

hooks/                # Custom React hooks
  useWeather.ts       # Fetches & caches weather data
  useGeolocation.ts   # Browser geolocation wrapper
  useStorage.ts       # browser.storage wrapper
  ...

services/             # API & browser service integrations
  weatherApi.ts       # All fetch calls to the weather backend
  storageService.ts   # Typed wrappers around browser.storage

types/                # Shared TypeScript types / interfaces
  weather.ts
  settings.ts

utils/                # Pure utility functions (no side effects)
  formatWeather.ts
  formatDate.ts
```

### 3. Best React Practices
- **Functional components only** — no class components.
- **Custom hooks for all side effects** — data fetching, storage reads/writes, geolocation must live in `hooks/`, not directly in components.
- **TypeScript strict mode** — all props, state, and function signatures must be fully typed. No `any`.
- **Colocate styles** — each component has its own `.css` file next to it. No global style spaghetti.
- **Avoid prop drilling** — use React Context for cross-cutting state (e.g., user settings, theme). Keep context providers thin.
- **Memoize expensive computations** with `useMemo`/`useCallback` only where measurably needed — don't over-optimize prematurely.
- **Error boundaries** — wrap async-data-dependent sections so a failed weather fetch never crashes the whole page.
- **Accessibility** — use semantic HTML and ARIA attributes on all interactive elements.

### 4. Code Style
- Use `const` and arrow functions for component definitions.
- Named exports for components; default export only for entrypoint files (e.g., `main.tsx`).
- Keep components under **150 lines** of TSX; extract sub-components when approaching this limit.
- No inline styles — always use CSS classes.
- CSS variables for all design tokens (colors, spacing, typography).

### 5. Extension-Specific Rules
- Use `browser.*` APIs from `wxt/browser` — never access `chrome.*` directly (breaks Firefox).
- Store user preferences (units, location override, theme) in `browser.storage.sync`.
- Cache weather data in `browser.storage.local` with a TTL of **10 minutes**.
- Keep `manifest.json` permissions minimal — only request what is actually used.
- The background service worker must remain stateless and minimal.

---

## Development Workflow

```bash
# Install dependencies
pnpm install

# Start dev server (Chrome)
pnpm dev

# Start dev server (Firefox)
pnpm dev:firefox

# Type-check
pnpm compile

# Build for production
pnpm build
```

---

## Agent Activity Log

> **Instructions for agents**: When you finish a task, append a new entry below using the format shown. Include the date, a short summary of what was done, and any important decisions or trade-offs made.

---

### 2026-06-15 — Initial Setup

**Agent**: Antigravity  
**Task**: Created `AGENT.md` and rewrote `README.md`.  
**Actions**:
- Explored full project structure (`entrypoints/`, `wxt.config.ts`, `package.json`).
- Created `AGENT.md` with project overview, core principles (performance, modularity, React best practices, extension rules), recommended folder structure, and this activity log.
- Rewrote `README.md` to reflect the actual project purpose and tech stack.

**Decisions**:
- Specified Vanilla CSS (no Tailwind) to keep bundle size minimal and match existing project convention.
- Set a 10-minute cache TTL for weather data as a sensible default balancing freshness vs. network usage.
- Mandated `browser.*` API usage (via WXT) instead of `chrome.*` to ensure cross-browser compatibility.

---

### 2026-06-15 — New Tab Page Title Fix

**Agent**: Antigravity  
**Task**: Rename the New Tab page title from "Weather Insights" to "New Tab".  
**Actions**:
- Updated `<title>` in `entrypoints/newtab/index.html` from `Weather Insights` → `New Tab`.

**Decisions**:
- Using "New Tab" matches standard browser new tab page conventions and avoids showing a branded title in the browser tab bar/history.

---

### 2026-06-15 — Most Visited Sites Sidebar

**Agent**: Antigravity  
**Task**: Add a left sidebar showing the 6 most visited sites, matching native New Tab UX without covering the weather iframe.  
**Actions**:
- Created `components/TopSites/TopSites.tsx` — fetches top 6 sites via `chrome.topSites.get()`, renders favicons via Google S2 service, gracefully hides if API unavailable.
- Created `components/TopSites/TopSites.css` — glassmorphism sidebar (200px wide), subtle hover animation (`translateX(2px)`), icon badge per site, scrollbar hidden.
- Updated `entrypoints/newtab/App.tsx` — switched to `flex-direction: row` layout (`<TopSites />` + iframe side by side).
- Updated `entrypoints/newtab/App.css` — added `.layout` flex row, iframe uses `flex: 1` to fill remaining width.
- Added `topSites` to `permissions` in `wxt.config.ts` — required for `chrome.topSites.get()`.

**Decisions**:
- Sidebar is 200px — wide enough to show truncated titles, narrow enough to leave weather app ample space.
- Google S2 favicon service used for consistent, high-quality icons without a custom fetch per site.
- `chrome.topSites` used directly (not `browser.topSites`) as WXT's cross-browser shim doesn't expose this API; guarded with a runtime check so it fails silently on Firefox.
- Sidebar renders `null` until sites load — no flash of empty content.

---

### 2026-06-15 — TopSites Refactor: Sidebar → Floating Bubbles

**Agent**: Antigravity  
**Task**: Replace the sidebar layout with floating icon bubbles overlaid directly on the full-screen weather iframe.  
**Actions**:
- Rewrote `components/TopSites/TopSites.tsx` — renders circular bubble anchors (no sidebar wrapper), each with a favicon and a hover tooltip.
- Rewrote `components/TopSites/TopSites.css` — `position: absolute; bottom: 36px; left: 36px` column of 52px glass circles; springy scale hover via `cubic-bezier(0.34, 1.56, 0.64, 1)`; slide-in tooltip to the right.
- Reverted `entrypoints/newtab/App.tsx` — removed `<div className="iframe-container">` flex wrapper; iframe now fills full screen, `<TopSites />` floats on top.
- Reverted `entrypoints/newtab/App.css` — `.layout` is `position: relative`, iframe is `position: absolute; inset: 0`.

**Decisions**:
- Bubbles positioned bottom-left so they don't overlap the weather content (typically top/center).
- `pointer-events: none` on the `.top-sites` nav so the iframe underneath receives all other clicks; individual bubbles re-enable `pointer-events: all`.
- Tooltip slides in to the right of the bubble to avoid obscuring the icon column.

---

### 2026-06-15 — Suppress Extension Icon from Tab Bar

**Agent**: Antigravity  
**Task**: Remove the extension logo from the New Tab tab bar so the page feels native/frictionless.  
**Actions**:
- Added `<link rel="icon" href="data:," />` to `entrypoints/newtab/index.html`.

**Decisions**:
- `href="data:,"` is the minimal empty data URI — universally supported, zero bytes, tells the browser explicitly that there is no favicon so it renders nothing instead of falling back to the extension icon.

---

### 2026-06-15 — Extension Icon, Name & Description

**Agent**: Antigravity  
**Task**: Convert `newTabLogo.svg` to all required PNG sizes and set it as the extension icon; rename extension and update description.  
**Actions**:
- Used `npx sharp-cli` to generate `public/icon/16.png`, `32.png`, `48.png`, `96.png`, `128.png` from `public/newTabLogo.svg`.
- Updated `wxt.config.ts` manifest: added `name`, `description`, and `icons` map for all 5 sizes.
- Updated `package.json`: renamed `name` to `weather-in-new-tab` and set `description` to match.

**Decisions**:
- All 5 sizes (16–128) generated to satisfy Chrome, Firefox, and Edge icon requirements across toolbar, extension management page, and Web Store listing.
- Icons declared explicitly in `wxt.config.ts` manifest so WXT includes them in the built manifest.json rather than relying on auto-detection.




