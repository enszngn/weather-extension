# Weather New Tab

A lightweight browser extension that replaces your New Tab page with a beautiful, fast-loading weather dashboard. Built with [WXT](https://wxt.dev/), React 19, and TypeScript.

## Features

- **New Tab Weather Dashboard** — See current weather the moment you open a new tab
- **Fast & Cached** — Weather data is cached locally for 10 minutes to keep the page snappy
- **Minimal Permissions** — Only requests what it needs (`storage`)
- **Cross-Browser** — Works on Chrome, Firefox, Safari, and Edge via WXT

## Tech Stack

| Layer | Technology |
|---|---|
| Extension Framework | [WXT](https://wxt.dev/) v0.20+ |
| UI | React 19 + TypeScript |
| Styling | Vanilla CSS |
| Weather Backend | Cloudflare Worker |
| Package Manager | pnpm |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (Chrome)
pnpm dev

# Start dev server (Firefox)
pnpm dev:firefox

# Type check
pnpm compile

# Production build
pnpm build
```

## Project Structure

```
entrypoints/       # WXT entrypoints (newtab, popup, background, content)
components/        # Shared React components
hooks/             # Custom React hooks (data fetching, storage, geolocation)
services/          # API & browser service integrations
types/             # Shared TypeScript types
utils/             # Pure utility functions
public/            # Static assets
```
