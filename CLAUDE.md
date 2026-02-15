# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 15 application that displays bumps charts, statistics, and historical data for Cambridge and Oxford rowing races. The app uses the App Router architecture and is built with TypeScript, Tailwind CSS, and Radix UI components.

The application serves two different sites from a single codebase:
- **cambridgebumps.com** - Cambridge rowing events (Lents, Mays, Town)
- **oxfordbumps.com** - Oxford rowing events (Eights, Torpids)

Configuration is controlled via environment variables in `.env.cambridge` and `.env.oxford` files.

## Development Commands

```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Configuration

The site switches between Cambridge and Oxford configurations using environment variables:

- `.env.cambridge` - Sets `NEXT_PUBLIC_TITLE=Cambridge`, `BASE_URL=https://www.cambridgebumps.com`, and `NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG`
- `.env.oxford` - Sets `NEXT_PUBLIC_TITLE=Oxford`, `BASE_URL=https://www.oxfordbumps.com`, and `NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG`

These control the site title, Google Analytics tag, and base URL throughout the application.

## Architecture

### App Router Structure

The app uses Next.js 15's App Router with a route structure based on rowing events:

- `/` - Home page
- `/charts/[event]/[gender]/[year]` - Single-year bumps charts
- `/multi-year-charts/[event]/[gender]` - Multi-year bumps charts
- `/statistics/[event]/[gender]` - Statistics overview
- `/statistics/[event]/[gender]/[statistic]` - Individual statistics pages
- `/about` - Bumps racing explanation
- `/vocabulary` - Rowing terminology

**Route Parameters:**
- `[event]` - One of: `eights`, `torpids`, `lents`, `mays`, `town`
- `[gender]` - Either `men` or `women`
- `[year]` - Historical year (e.g., `2025`, `1887`)

### Static Site Generation

The app is primarily statically generated:
- Charts and statistics use `generateStaticParams()` to pre-render all valid event/gender/year combinations at build time
- Results data is stored in JSON format in `src/data/results/` organized by event
- The results summary in `src/app/charts/data/results.json` lists all available years for each event/gender combination

### Configuration Files

- `src/config/site.ts` - Site metadata (name, description, social links) that reads from environment variables
- `src/config/docs.ts` - Navigation structure defining main nav and sidebar items
- `next.config.mjs` - Redirects for legacy URLs and default routes

### Data Organization

Results and statistics data is structured as:
```
src/data/
├── results/
│   ├── [event]/
│   │   ├── men/
│   │   └── women/
│   └── results.json (summary of available years)
├── stats/                (pre-computed statistics)
src/app/charts/data/
└── results.json          (duplicate summary used by chart routes)
```

Each event directory contains TypeScript files that export race results for specific years.

### Key Components

- `src/components/bumps-chart.tsx` - Client component wrapping `react-bumps-chart` library
- `src/components/multi-year-bumps-chart.tsx` - Multi-year chart visualization
- `src/components/events-nav.tsx` - Event/gender navigation
- `src/components/site-header.tsx` - Main site header with navigation
- `src/components/site-footer.tsx` - Site footer
- `src/components/main-nav.tsx` - Desktop navigation
- `src/components/mobile-nav.tsx` - Mobile navigation
- `src/components/year-picker.tsx` - Year selection component
- `src/components/mode-toggle.tsx` - Dark/light theme toggle
- `src/components/photos.tsx` - Photo display
- `src/components/ui/` - shadcn/ui components (Radix UI primitives)
- `src/app/charts/components/` - Chart-specific blades/spoons sub-components
- `src/app/multi-year-charts/components/` - Multi-year chart-specific sub-components

### Utilities

`src/lib/utils.ts` contains:
- `cn()` - Tailwind class name merger using clsx and tailwind-merge
- `set` - Mapping of event keys to display names (e.g., `mays` → "May Bumps")
- `genderMap` - Gender key to display name mapping
- `events` and `genders` - Typed arrays and types for route parameters
- `getCode()` - Function to get club codes for blade displays

### Client-Side Features

Charts support URL search parameters:
- `?club=<clubname>` - Highlights a specific club in the chart
- `?blades=true` - Shows blades (awarded for bumping up every day of the event)
- `?spoons=true` - Shows spoons (awarded for being bumped down every day of the event)

The bumps chart component uses `useSearchParams()` to read these and applies highlighting dynamically.

### SEO

- `src/app/robots.ts` - Dynamic robots.txt generation
- `src/app/sitemap.ts` - Dynamic sitemap generation
- Google Analytics via `@next/third-parties/google` in the root layout

### Fonts

- Geist Sans and Geist Mono loaded as local fonts from `src/app/fonts/`
- Roboto Flex loaded for bumps chart rendering

## Key Dependencies

- `react-bumps-chart` - Core bumps chart visualization library
- `react-rowing-blades` - Club blade/colors rendering
- `bumps-results-tools` - Results data processing utilities
- `@next/third-parties` - Google Analytics integration
- `next-themes` - Dark mode support
- Radix UI components via shadcn/ui for accessible UI primitives

## Path Aliases

TypeScript is configured with `@/*` mapping to `src/*` for cleaner imports.

## Important Patterns

1. **Environment-driven configuration**: The same codebase serves both Cambridge and Oxford sites by reading `process.env.NEXT_PUBLIC_TITLE` and `process.env.BASE_URL`

2. **Static generation with dynamic highlighting**: Pages are statically generated but client-side JavaScript enables interactive highlighting via URL params

3. **Typed route parameters**: Events and genders are defined as const arrays with extracted types to ensure type safety across routing

4. **Extensive redirects**: Legacy URLs are preserved via redirects in `next.config.mjs` to maintain SEO and existing links
