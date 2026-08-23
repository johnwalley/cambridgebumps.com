# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an Astro application that displays bumps charts, statistics, and historical data for Cambridge and Oxford rowing races. Pages are Astro components; the interactive parts are React islands, styled with Tailwind CSS and Radix UI components.

The application serves two different sites from a single codebase:

- **cambridgebumps.com** - Cambridge rowing events (Lents, Mays, Town)
- **oxfordbumps.com** - Oxford rowing events (Eights, Torpids)

Configuration is controlled via environment variables in `.env.cambridge` and `.env.oxford` files.

## Development Commands

```bash
# Development server (http://localhost:4321)
pnpm dev

# Development server serving the Oxford configuration
pnpm dev:oxford

# Production build (writes to dist/)
pnpm build
pnpm build:oxford

# Serve the built site locally
pnpm preview

# Lint code
pnpm lint

# Type-check (astro check: .astro, .ts and .tsx)
pnpm typecheck

# Format (Prettier) / check formatting
pnpm format
pnpm format:check

# Regenerate the client-safe chart metadata (also runs automatically on prebuild)
pnpm gen:chart-meta

# Regenerate vercel.json redirects (run after adding a new year — see below)
pnpm gen:redirects
```

`pnpm build` runs a `prebuild` hook (`scripts/generate-chart-meta.mjs`) that regenerates `src/data/chart-meta.json` first.

## Environment Configuration

`SITE` selects which checked-in env file is read (`cambridge` by default, i.e. `.env.cambridge`; `SITE=oxford` reads `.env.oxford`). Both define:

- `PUBLIC_TITLE` — "Cambridge" or "Oxford"; drives the site name throughout
- `PUBLIC_BASE_URL` — the canonical origin
- `PUBLIC_GOOGLE_ANALYTICS_TAG` — the GA measurement ID

`astro.config.mjs` reads them (via `scripts/site-env.mjs`) and injects them into both server and client bundles with `vite.define`, so `import.meta.env.PUBLIC_*` works everywhere — see `src/config/site.ts`.

Variables set in the real environment (Vercel project settings, a shell export) always beat the checked-in files. The Next.js-era names (`NEXT_PUBLIC_TITLE`, `BASE_URL`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG`) are still read as fallbacks so an existing deployment keeps working.

## Architecture

### Routes

`src/pages` maps directly to URLs:

- `/` — `src/pages/index.astro`
- `/charts/[event]/[gender]/[year]` — single-year bumps charts
- `/multi-year-charts/[event]/[gender]` — multi-year bumps charts
- `/statistics/[event]/[gender]` — statistics overview
- `/statistics/[event]/[gender]/[statistic]` — individual statistics pages
- `/about` — `src/pages/about.mdx`, bumps racing explanation
- `/vocabulary` — rowing terminology
- `/robots.txt`, `/sitemap.xml` — endpoints (`src/pages/robots.txt.ts`, `sitemap.xml.ts`)
- `/data/results/[event]/[gender].json` — the results feed the multi-year charts fetch

**Route Parameters:**

- `[event]` - One of: `eights`, `torpids`, `lents`, `mays`, `town`
- `[gender]` - Either `men` or `women`
- `[year]` - Historical year (e.g. `2025`, `1887`)

### Static output

The site is a **fully static build** (`output: "static"`): `pnpm build` emits HTML/JS to `dist/` with no server at runtime. `build.format: "file"` makes Astro write `charts/mays/men/2025.html` rather than `…/2025/index.html`, so the deployed URLs are exactly the ones the site has always served.

- Every dynamic route lists its pages in `getStaticPaths()`
- Results data is stored in JSON format in `src/data/results/` organized by event
- The per-event/gender summary of available years is **derived in code** at build time (the `summary` export in `src/data/results.ts`), so it can never drift from the underlying results

### Islands

Pages are static HTML by default. React components render to HTML too unless given a `client:*` directive; the hydrated ones are:

- `SiteHeader` (`src/components/site-header.tsx`) — the whole header is one island: main nav, mobile sheet, theme toggle, and the `useRememberEvent` hook that stores the visitor's last event/gender
- `ChartsShell` / `MultiYearChartsShell` — the chart pages' controls plus the chart itself
- `StatisticsNav` — the event/category/statistic pickers
- `BumpsChartsCta` — the home page CTA, whose href depends on the stored preference

Everything else (statistics tables, blades, photos, prose) is rendered at build time and ships no JavaScript. React components used without a directive — `<Blade>` from `react-rowing-blades`, for instance — are server-rendered inside `.astro` files.

### Configuration Files

- `astro.config.mjs` — integrations, redirects, site URL, env injection
- `src/config/site.ts` - Site metadata (name, description, social links) read from `import.meta.env`
- `src/config/docs.ts` - Navigation structure defining main nav and sidebar items

### Data Organization

Results and statistics data is structured as:

```
src/data/
├── results/
│   ├── [event]/[men|women]/results.json   (raw race results — the ~13 MB dataset)
│   └── results.json                        (external summary artifact; not imported by app code)
├── stats/                                  (pre-computed statistics, by event)
├── stats.ts                                (imports the stats JSON; the statistic → label mapping)
├── results.ts                              (imports the raw JSON; derives the `summary` of years)
├── chart-meta.json                         (generated, committed — see below)
└── chart-meta.ts                           (typed accessor over chart-meta.json)
```

Each event/gender has a single `results.json` of race results (not per-year TypeScript files).

**`chart-meta.json` / `chart-meta.ts`** are a build-time, client-safe slice of the data — the per-event/gender year lists plus the club names used to populate the "Highlight club" dropdowns. They exist so the chart shells can be handed just years + club lists without the full ~13 MB `@/data/results` module reaching the browser. Generated by `scripts/generate-chart-meta.mjs` (runs on `prebuild`; regenerate manually with `pnpm gen:chart-meta`) and committed to git — so after adding a new year, regenerate it (or `astro dev` dropdowns will lag the data; a `pnpm build` picks it up automatically via prebuild).

A single year's results are small, so a chart page passes them straight to its island. A whole event's results are megabytes, so the multi-year charts instead fetch `/data/results/[event]/[gender].json`, generated by `src/pages/data/results/[event]/[gender].json.ts`. Both charts only render in the browser, so nothing is lost by fetching.

The top-level `src/data/results/results.json` is a separately-maintained summary (capitalized event keys) produced by the external data pipeline; no app code imports it, so don't treat it as load-bearing here.

### Key Components

- `src/layouts/BaseLayout.astro` - `<head>` metadata, theme script, header, Google Analytics
- `src/layouts/ProseLayout.astro` - wrapper for the MDX pages
- `src/layouts/StatisticsLayout.astro` - heading + pickers shared by the statistics pages
- `src/components/charts-shell.tsx` - single-year chart page (controls + chart)
- `src/components/multi-year-charts-shell.tsx` - multi-year chart page
- `src/components/bumps-chart.tsx` - wraps the `react-bumps-chart` library
- `src/components/multi-year-bumps-chart.tsx` - multi-year chart, fetches its own data
- `src/components/site-header.tsx` - header island
- `src/components/main-nav.tsx` / `mobile-nav.tsx` - desktop and mobile navigation
- `src/components/events-nav.tsx` / `multi-year-events-nav.tsx` - event tabs
- `src/components/event-select.tsx` / `gender-radio-group.tsx` - pickers shared by charts and statistics
- `src/components/year-picker.tsx` - scrollable year strip
- `src/components/mode-toggle.tsx` - dark/light theme toggle
- `src/components/Photos.astro` - home page photo strip (`astro:assets`)
- `src/components/GoogleAnalytics.astro` - the gtag snippet
- `src/components/ui/` - shadcn/ui components (Radix UI primitives)

### Utilities

`src/lib/utils.ts` contains:

- `cn()` - Tailwind class name merger using clsx and tailwind-merge
- `set` - Mapping of event keys to display names (e.g., `mays` → "May Bumps")
- `genderMap` / `getGenderLabel()` - category labels ("Open" for the Cambridge men's events)
- `events` and `genders` - Typed arrays and types for route parameters
- `getCode()` - Function to get club codes for blade displays

`src/lib/theme.ts` holds the light/dark logic that `next-themes` used to provide. The class is applied before first paint by an inline script in `BaseLayout.astro`; the storage key (`theme`) and values (`light`/`dark`/`system`) are unchanged, so returning visitors keep their choice.

### Client-Side Features

Charts support URL search parameters:

- `?club=<clubname>` - Highlights a specific club in the chart
- `?blades=true` - Shows blades (awarded for bumping up every day of the event)
- `?spoons=true` - Shows spoons (awarded for being bumped down every day of the event)

`src/hooks/use-chart-params.ts` owns them: the shell reads the query string after mount and updates it with `history.pushState`, so toggling a highlight re-renders the chart without a page load. Links that change event/gender/year carry the current query string along (`withParams`).

### SEO

- `src/pages/robots.txt.ts` → `/robots.txt`
- `src/pages/sitemap.xml.ts` → `/sitemap.xml`, enumerating every chart, multi-year and statistics page
- `BaseLayout.astro` renders title/description/canonical/Open Graph/Twitter tags; pages pass what they need. Chart pages pre-generated for a year with no results yet set `noindex`.
- Google Analytics via `src/components/GoogleAnalytics.astro` in the base layout

### Fonts

- Geist Sans and Geist Mono self-hosted from `public/fonts/`, declared in `src/styles/globals.css`
- Roboto Flex via `@fontsource-variable/roboto-flex` (latin subset, GRAD axis) for bumps chart rendering

## Key Dependencies

- `astro` with `@astrojs/react` and `@astrojs/mdx`
- `react-bumps-chart` - Core bumps chart visualization library
- `react-rowing-blades` - Club blade/colors rendering
- `bumps-results-tools` - Results data processing utilities
- `@tailwindcss/vite` - Tailwind v4
- Radix UI components via shadcn/ui for accessible UI primitives

## Path Aliases

TypeScript is configured with `@/*` mapping to `src/*` for cleaner imports.

## Important Patterns

1. **Environment-driven configuration**: The same codebase serves both Cambridge and Oxford sites by reading `import.meta.env.PUBLIC_TITLE` and `import.meta.env.PUBLIC_BASE_URL`

2. **Static generation with dynamic highlighting**: Pages are statically generated but client-side JavaScript enables interactive highlighting via URL params

3. **Typed route parameters**: Events and genders are defined as const arrays with extracted types to ensure type safety across routing

4. **Extensive redirects**: Legacy URLs are preserved via redirects to maintain SEO and existing links

## Redirects and the "latest year" default

Redirects are defined once in `scripts/redirects.mjs` and consumed in two places:

- `scripts/generate-vercel-redirects.mjs` writes `vercel.json`, which serves them in **production**.
- `astro.config.mjs` turns the same list into Astro `redirects` (via `buildAstroRedirects`, which expands the `:event`/`:gender` patterns into concrete paths). These generate small redirect pages so `astro dev`, `astro preview` and any plain static host behave like production.

The default chart year (e.g. the target of `/charts`, `/charts/:event`, `/charts/:event/:gender`) is derived from the latest year in each event/gender's `results.json` — never hand-edited.

> [!IMPORTANT]
> **After adding a new year's results, regenerate both derived artifacts and commit them:**
>
> 1. `pnpm gen:redirects` → updates `vercel.json`. Otherwise the "Bumps charts" link and bare `/charts/...` URLs will keep redirecting to the previous year in production. This bit us when Town 2026 was added but `vercel.json` still pointed to 2025.
> 2. `pnpm gen:chart-meta` → updates `src/data/chart-meta.json` (the year lists and club dropdowns). This runs automatically on `pnpm build`'s prebuild, but `astro dev` reads the committed file, so regenerate it to see the new year/clubs locally.
